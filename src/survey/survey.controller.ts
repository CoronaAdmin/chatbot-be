import { Controller,Get,Post,Body, UsePipes } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import { ValidationPipe } from '../common/validation.pipe';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Survey Management")
@Controller('survey')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) {}

    @Get()
    welcome(): string {
        return 'Welcome to COVID-19 surveys';
    }

    //get all surveys list
    @Get('/all')
    getAllSurveys():Promise<any>{
        return this.surveyService.getAllSurveys();
    }

    //create a survey
    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<any>{
        return this.surveyService.create(createSurveyDto)
    }
}
