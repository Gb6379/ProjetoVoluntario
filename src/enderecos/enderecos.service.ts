import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnderecosService {

  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ){}

  async create(createEnderecoDto: CreateEnderecoDto) {

    const endereco = this.enderecoRepository.create(createEnderecoDto)
    return await this.enderecoRepository.save(endereco);
  }

  async findAllUserAdresses(userId: number): Promise<Endereco[]> {
    return await this.enderecoRepository.find({
      where:{
        user: {
          id: userId
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  async update(enderecoId: number, updateEnderecoDto: UpdateEnderecoDto) {//do promise here
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: enderecoId,
      }
    })
    endereco.cep = updateEnderecoDto.cep
    endereco.rua = updateEnderecoDto.rua
    endereco.bairro = updateEnderecoDto.bairro
    endereco.numero = updateEnderecoDto.numero
    endereco.cidade = updateEnderecoDto.cidade

    await this.enderecoRepository.save(endereco)

    return `This action updates a #${enderecoId} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
