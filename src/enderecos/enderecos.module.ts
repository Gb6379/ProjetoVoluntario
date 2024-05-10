import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { Endereco } from './entities/endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { InstitutionModule } from 'src/institution/institution.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endereco]),  
    UserModule,
    InstitutionModule
    //PassportModule.register({defaultStrategy: 'azureAd'}),
  ],
  controllers: [EnderecosController],
  providers: [EnderecosService],
  exports: [EnderecosService]
})
export class EnderecosModule {}
