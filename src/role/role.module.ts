import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),  
        PassportModule.register({defaultStrategy: 'azureAd'})
      ],
      providers: [
        RoleService
      ],
      controllers: [],
      exports: [RoleService]
})
export class RoleModule {}
