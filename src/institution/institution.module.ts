import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { Institution } from './entities/institution.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),  
    //PassportModule.register({defaultStrategy: 'azureAd'}),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
