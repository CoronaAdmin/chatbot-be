import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { Repository } from 'typeorm';
import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(SurveyRepository)
        private readonly surveyRepository: SurveyRepository,
      ) {}

    async create(user:any,data:CreateSurveyDto) {
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
        return this.surveyRepository.createSurvey(data)
      }

    async getAllSurveys(user:any):Promise<any>{
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.surveyRepository.getSurveys()
    }

    async deleteSurvey(user:any,survey_id:number):Promise<any>{
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.surveyRepository.deleteSurvey(survey_id)
    }
}
