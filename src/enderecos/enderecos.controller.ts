import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.create(createEnderecoDto);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: number): Promise<Endereco[]> {
    return await this.enderecosService.findAllUserAdresses(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecosService.findOne(+id);
  }

  @Put(':enderecoId')
  update(@Param('enderecoId') enderecoId: number, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecosService.update(enderecoId, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecosService.remove(+id);
  }
}
