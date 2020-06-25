import { Module } from '@nestjs/common';
import { SurveyController } from "./survey/survey.controller";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './config/db.config';
import { SurveyService } from './survey/survey.service';
import { SurveyModule } from './survey/survey.module';
import { SurveyRepository } from './survey/survey.repository';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { AnswersController } from './answers/answers.controller';
import { AnswersService } from './answers/answers.service';
import { AnswersModule } from './answers/answers.module';

@Module({
  
  imports: [TypeOrmModule.forRoot(DbConfig),
    AccountModule,
    SurveyModule,
    QuestionsModule,
    AnswersModule],
  controllers: [
    AccountController,
    SurveyController,
    QuestionsController,
    AnswersController,
  ],
  providers: [],
  
})
export class AppModule {}
