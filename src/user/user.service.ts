import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { checkHttpException } from 'src/exceptions/http-exception';
import { RegisterResponse } from 'src/responses/RegisterResponse';
import { PasswordUtil } from 'src/utils/password.util';
import { NUMBER_ER_DUP_ENTRY } from 'src/exceptions/mysql.error.numbers';
import { StringUtil } from 'src/utils/string.utils';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}


  async create(createUserDto: CreateUserDto): Promise<RegisterResponse> {
    try {
      const password: string = PasswordUtil.createPassword()
      const registration: string = StringUtil.generateRandomRegistrationNumber()
      createUserDto.password = password;
      createUserDto.registration = registration;
      const user = this.usersRepository.create(createUserDto)

      const userId: RegisterResponse = {
        id: (await this.usersRepository.save(user)).id
      }

      this.logger.log(`User ${createUserDto.registration} created`);

      return userId;

    } catch (error) {
      if(error?.errno === NUMBER_ER_DUP_ENTRY) {
        this.logger.error(`User already exists. ${error?.sqlMessage}`);

        throw new HttpException({ reason: `User already exists. [MYSQL error number: ${NUMBER_ER_DUP_ENTRY} - ${error?.sqlMessage}]` }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    try {
      this.logger.log(`Searching user ${email}`);

      return this.usersRepository.findOne({
        where: {
          email,
          inactivatedAt: IsNull()
        }
      });
    } catch(error) {
      checkHttpException(error, this.logger);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
