import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async createQuestions(user:any,data:CreateQuestionsDto,id:number) {
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
        return this.questionsRepository.createQuestions(data,id,this.surveyRepository)
      }

    async getAllQuestions(user:any):Promise<any>{
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.questionsRepository.getQuestions()
    }

    async getSurveyQuestions(user:any,surveyId:number):Promise<any>{
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.questionsRepository.getSurveyQuestions(surveyId,this.surveyRepository)
    }

    async deleteQuestion(user:any,ques_id:number):Promise<any>{
      if(user.type !=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.questionsRepository.deleteQuestion(ques_id)
    }


}

