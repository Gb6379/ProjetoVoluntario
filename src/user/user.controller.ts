import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthHelper } from 'src/auth/auth.helper';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ID_RESPONSE } from 'src/constants';
import { RegisterResponse } from 'src/responses/RegisterResponse';
import { DeleteResult } from 'typeorm';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly authHelper: AuthHelper
  ) {}

  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse(ID_RESPONSE)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<RegisterResponse> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOkResponse({ type: DeleteResult })
 // @UseGuards(AuthGuard(['azureAd', 'jwt']))
  //@Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
