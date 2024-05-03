import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { checkHttpException } from 'src/exceptions/http-exception';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
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
