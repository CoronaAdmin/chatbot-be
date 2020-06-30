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
import { ChatbotController } from './chatbot/chatbot.controller';
import { ChatbotService } from './chatbot/chatbot.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import {DefaultAdminModule} from 'nestjs-admin'
@Module({
  
  imports: [TypeOrmModule.forRoot(DbConfig),
    AccountModule,
    SurveyModule,
    QuestionsModule,
    AnswersModule,
    ChatbotModule,
  DefaultAdminModule],
  controllers: [
    AccountController,
    SurveyController,
    QuestionsController,
    AnswersController,
    ChatbotController,
  ],
  providers: [],
  
})
export class AppModule {}
