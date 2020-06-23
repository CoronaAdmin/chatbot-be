import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { SurveyRepository } from './survey.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([Survey,SurveyRepository]),
    ],
    controllers: [SurveyController],
    providers: [SurveyService,SurveyRepository],
    exports:[SurveyService]
})
export class SurveyModule {}
