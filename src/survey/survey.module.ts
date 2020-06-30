import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { SurveyRepository } from './survey.repository';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { SurveyAdmin } from './survey.admin';

@Module({
    imports:[
        TypeOrmModule.forFeature([Survey,SurveyRepository]),
        DefaultAdminModule
    ],
    controllers: [SurveyController],
    providers: [SurveyService,SurveyRepository],
    exports:[SurveyService,SurveyRepository]
})
export class SurveyModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        
        adminSite.register('Survey', SurveyAdmin)
      }
}
