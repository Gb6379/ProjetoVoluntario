import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return await this.institutionService.create(createInstitutionDto);
  }

  @Get()
  async findInstitutions() {
    return await this.institutionService.findInstitutions();
  }

  @Get(':institutionId')
  findOne(@Param('institutionId') institutionId: number) {
    return this.institutionService.findInstitution(institutionId);
  }

  @Put(':institutionId')
  async update(@Param('institutionId') institutionId: number, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return await this.institutionService.update(institutionId, updateInstitutionDto);
  }

  @Delete(':institutionId')
  async remove(@Param('institutionId') institutionId: number) {
    return this.institutionService.remove(institutionId);
  }
}
