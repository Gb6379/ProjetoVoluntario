import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { checkHttpException } from 'src/exceptions/http-exception';
import { UserCreateResponse } from 'src/responses/UserCreateResponse';
import { PasswordUtil } from 'src/utils/password.util';
import { NUMBER_ER_DUP_ENTRY } from 'src/exceptions/mysql.error.numbers';
import { StringUtil } from 'src/utils/string.utils';
import { Role } from 'src/role/role.entity';
import { RoleEnum } from 'src/role/role.enum';
import { UpdateResponse } from 'src/responses/UpdateEnderecoResponde';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }


  async create(createUserDto: CreateUserDto): Promise<UserCreateResponse> {
    try {
      const role: Role = new Role(createUserDto.role?.id ?? RoleEnum.VOLUNTARIO);
      const password: string = PasswordUtil.createPassword()
      console.log("passowrd", password)
      const registration: string = StringUtil.generateRandomRegistrationNumber()
      createUserDto.password = password;
      createUserDto.registration = registration;
      createUserDto.role = role;
      const user = this.usersRepository.create(createUserDto)

      const userRes: UserCreateResponse = {
        user: (await this.usersRepository.save(user))
      }

      this.logger.log(`User ${createUserDto.registration} created`);

      return userRes;

    } catch (error) {
      if (error?.errno === NUMBER_ER_DUP_ENTRY) {
        this.logger.error(`User already exists. ${error?.sqlMessage}`);

        throw new HttpException({ reason: `User already exists. [MYSQL error number: ${NUMBER_ER_DUP_ENTRY} - ${error?.sqlMessage}]` }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAllVoluntaries() {
    return await this.usersRepository.find({
      where: {
        inactivatedAt: IsNull(),
        role: {
          id: RoleEnum.VOLUNTARIO
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        funcao: true,
      },
      relations: {
        enderecos: true
      }
    });
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
    } catch (error) {
      checkHttpException(error, this.logger);
    }
  }

  async findUser(userId: number): Promise<User> {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: userId
        },
        relations: {
          enderecos: true,
          role: true
        }
      });
    } catch (error) {
      checkHttpException(error, this.logger);
    }

  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    const user = await this.findUser(userId)
    if (user) {
      Object.assign(user, updateUserDto);
      //user.save()
      await this.usersRepository.save(user)
      return { updatedMessage: `usuario ${userId} atualizado com sucesso` };
    }
    throw new NotFoundException('Usuario nao encontrado')

  }

  async remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
