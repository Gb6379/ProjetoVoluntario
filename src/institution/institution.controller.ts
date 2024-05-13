import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ParamRequired } from 'src/custom-decorators/param-required.decorator';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return await this.institutionService.create(createInstitutionDto);
  }

  @Get('pickupSpot')
  async findPickupSpot() {
    return await this.institutionService.findPickupSpot()
  }


  @Get('shelter')
  async findShelter() {
    console.log("wu")
    return await this.institutionService.findShelter()
  }
  
  @Get()
  async findInstitutions() {
    return await this.institutionService.findInstitutions();
  }

  @Get('filter')
  async findByName(@ParamRequired("name") name: string){
    console.log("wu")
    return this.institutionService.filterByName(name)
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
