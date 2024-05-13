import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  addEnderecoVoluntario(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.addEnderecoVoluntario(createEnderecoDto);
  }

  @Post("institution")
  addEnderecoIntitution(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.addEnderecoInstitution(createEnderecoDto);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: number): Promise<Endereco[]> {
    return await this.enderecosService.findAllUserAdresses(userId);
  }

  @Get('institution/:institutionId')
  async findAllInstitution(@Param('institutionId') institutionId: number): Promise<Endereco[]> {
    return await this.enderecosService.findAllInstitutionAdresses(institutionId);
  }


  @Get(':addressId')
  findOne(@Param('addressId') addressId: number): Promise<Endereco> {
    return this.enderecosService.findAddress(addressId);
  }

  @Put(':enderecoId')
  async update(@Param('enderecoId') enderecoId: number, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return await this.enderecosService.update(enderecoId, updateEnderecoDto);
  }

  @Delete(':enderecoId')
  async remove(@Param('enderecoId') enderecoId: number) {
    return await this.enderecosService.remove(enderecoId);
  }
}
