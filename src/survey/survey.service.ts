import { Injectable } from '@nestjs/common';
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

    async create(data:CreateSurveyDto) {
        return this.surveyRepository.createSurvey(data)
      }

    async getAllSurveys():Promise<any>{
      return this.surveyRepository.getSurveys()
    }
}
