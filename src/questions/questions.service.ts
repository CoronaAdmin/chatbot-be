import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsRepository } from './questions.repository';
import { CreateQuestionsDto } from './dto/questions.dto';
import { SurveyRepository } from 'src/survey/survey.repository';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionsRepository)
        private readonly questionsRepository: QuestionsRepository,
        private readonly surveyRepository:SurveyRepository,
      ) {}
    async createQuestions(data:CreateQuestionsDto,id:number) {
        return this.questionsRepository.createQuestions(data,id,this.surveyRepository)
      }
}

