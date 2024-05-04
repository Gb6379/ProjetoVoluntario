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

  findAll() {
    return `This action returns all enderecos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
