import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthHelper } from 'src/auth/auth.helper';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ID_RESPONSE } from 'src/constants';
import { UserCreateResponse } from 'src/responses/UserCreateResponse';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ParamRequired } from 'src/custom-decorators/param-required.decorator';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly authHelper: AuthHelper
  ) {}

  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse(ID_RESPONSE)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserCreateResponse> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard(['jwt']))
  @Get()
  async findAll() {
    return await this.userService.findAllVoluntaries();
  }

  
  @Get('filter')
  async findByName(@ParamRequired("name") name: string){
    return this.userService.filterByName(name)
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number) {
    return await this.userService.findUser(userId);
  }

  @Put(':userId')
  async update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  @ApiOkResponse({ type: DeleteResult })
 // @UseGuards(AuthGuard(['azureAd', 'jwt']))
  //@Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
