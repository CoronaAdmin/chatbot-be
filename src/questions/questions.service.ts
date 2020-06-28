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

    async getAllQuestions():Promise<any>{
      return this.questionsRepository.getQuestions()
    }

    async getSurveyQuestions(surveyId:number):Promise<any>{
      return this.questionsRepository.getSurveyQuestions(surveyId,this.surveyRepository)
    }

    async deleteQuestion(ques_id:number):Promise<any>{
      return this.questionsRepository.deleteQuestion(ques_id)
    }


}

