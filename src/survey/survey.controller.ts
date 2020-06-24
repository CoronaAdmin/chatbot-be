import { Controller,Get,Post,Body, UsePipes } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import { ValidationPipe } from '../common/validation.pipe';


@Controller('survey')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) {}

    @Get()
    welcome(): string {
        return 'Welcome to COVID-19 surveys';
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<any>{
        return this.surveyService.create(createSurveyDto)
    }
}
