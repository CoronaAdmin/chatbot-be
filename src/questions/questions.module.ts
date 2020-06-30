import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entity/questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsRepository } from './questions.repository';
import { SurveyRepository } from 'src/survey/survey.repository';
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin';

@Module({
    imports:[
        TypeOrmModule.forFeature([Questions,QuestionsRepository,SurveyRepository]),
        DefaultAdminModule
    ],
    controllers: [QuestionsController],
    providers: [QuestionsService],
    exports:[QuestionsService]
})
export class QuestionsModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        adminSite.register('Questions', Questions)
      }
}
