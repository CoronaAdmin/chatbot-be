import { Controller,Get,Post,Body } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {

    constructor(private surveyService: SurveyService) {}

    @Get()
    welcome(): string {
        return 'Welcome to COVID-19 surveys';
    }

    @Post()
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<any>{
        return this.surveyService.create(createSurveyDto)
    }
}
