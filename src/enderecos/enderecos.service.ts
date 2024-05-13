import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResponse } from 'src/responses/UpdateEnderecoResponde';
import { InstitutionService } from 'src/institution/institution.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EnderecosService {

  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    private readonly insitutionService: InstitutionService,
    private readonly userService: UserService
  ) { }

  async addEnderecoVoluntario(createEnderecoDto: CreateEnderecoDto) {

    const user = await this.userService.findUser(createEnderecoDto.userId)
    const endereco: CreateEnderecoDto = Object.assign({}, createEnderecoDto, { user: user });
    this.enderecoRepository.create(createEnderecoDto)
    return await this.enderecoRepository.save(endereco);
  }

  async addEnderecoInstitution(createEnderecoDto: CreateEnderecoDto) {
    const instu = await this.insitutionService.findInstitution(createEnderecoDto.institutionId)
    const endereco: CreateEnderecoDto = Object.assign({}, createEnderecoDto, { institution: instu });
    this.enderecoRepository.create(endereco)
    return await this.enderecoRepository.save(endereco);
  }

  async onlySaveAddres(createEnderecoDto: CreateEnderecoDto) {
    const endereco = this.enderecoRepository.create(createEnderecoDto)
    return await this.enderecoRepository.save(endereco);
  }

  async findAllUserAdresses(userId: number): Promise<Endereco[]> {
    return await this.enderecoRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
  }

  
  async findAllInstitutionAdresses(institutionId: number): Promise<Endereco[]> {
    return await this.enderecoRepository.find({
      where: {
        institution: {
          id: institutionId
        }
      }
    })
  }


  async findAddress(addressId: number): Promise<Endereco> {
    return await this.enderecoRepository.findOne({
      where: {
        id: addressId
      }
    });
  }

  async update(enderecoId: number, updateEnderecoDto: UpdateEnderecoDto): Promise<UpdateResponse> {//do promise here
    const endereco = await this.findAddress(enderecoId);
    if (endereco) {
      Object.assign(endereco, updateEnderecoDto);

      await this.enderecoRepository.save(endereco)

      return { updatedMessage: `endereco ${enderecoId} atualizado com sucesso` };
    }
    throw new NotFoundException('Endereco nao encontrado')
  }

  async remove(enderecId: number) {
    return this.enderecoRepository.delete(enderecId)
  }
}
