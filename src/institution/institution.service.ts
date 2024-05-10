import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Role } from 'src/role/role.entity';
import { PasswordUtil } from 'src/utils/password.util';
import { RoleEnum } from 'src/role/role.enum';
import { StringUtil } from 'src/utils/string.utils';
import { NUMBER_ER_DUP_ENTRY } from 'src/exceptions/mysql.error.numbers';
import { InstitutionCreateResponse } from 'src/responses/InstitutionCreateResponse';
import { checkHttpException } from 'src/exceptions/http-exception';
import { UpdateResponse } from 'src/responses/UpdateEnderecoResponde';


@Injectable()
export class InstitutionService {

  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) { }
  async create(createInstitutionDto: CreateInstitutionDto) {
    try {
      const role: Role = new Role(createInstitutionDto.role?.id ?? RoleEnum.INTITUITION);
      const password: string = PasswordUtil.createPassword()
      console.log("passowrd", password)
      
      createInstitutionDto.password = password;

      createInstitutionDto.role = role;
      const user = this.institutionRepository.create(createInstitutionDto)

      const institutionRes: InstitutionCreateResponse = {
        institution: (await this.institutionRepository.save(user))
      }

      this.logger.log(`User ${createInstitutionDto.name} created`);

      return institutionRes;

    } catch (error) {
      if (error?.errno === NUMBER_ER_DUP_ENTRY) {
        this.logger.error(`Institution already exists. ${error?.sqlMessage}`);

        throw new HttpException({ reason: `Institution already exists. [MYSQL error number: ${NUMBER_ER_DUP_ENTRY} - ${error?.sqlMessage}]` }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findInstitutions() {
    return await this.institutionRepository.find({
      where: {
        role: {
          id: RoleEnum.INTITUITION
        }
      },
      relations: {
        enderecos : true
      }
      
    }); ;
  }

  async findInstitutionByEmail(email: string): Promise<Institution> {
    try {
      this.logger.log(`Searching institution ${email}`);

      return await this.institutionRepository.findOne({
        where: {
          email,
        },
        relations: {
          role: true
        }
      });
    } catch (error) {
      checkHttpException(error, this.logger);
    }
  }

  async findInstitution(institutionId: number) {
    try {
      return await this.institutionRepository.findOne({
        where: {
          id: institutionId
        },
        relations: {
          enderecos: true,
          role: true
        }
      })
    } catch (error) {
      checkHttpException(error, this.logger);
    }
    
     
  }

 async update(institutionId: number, updateInstitutionDto: UpdateInstitutionDto):Promise<UpdateResponse> {
  const institution = await this.findInstitution(institutionId)
  if(institution){
    Object.assign(institution, updateInstitutionDto)
    await this.institutionRepository.save(institution)

    return { updatedMessage: `Instituição ${institutionId} atualizado com sucesso` };
  }
 

  }

  async remove(institutionId: number) {
    return this.institutionRepository.delete(institutionId);
  }
}
