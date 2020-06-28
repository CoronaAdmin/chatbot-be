import { Controller,Get,Post,Body, UsePipes, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import { ValidationPipe } from '../common/validation.pipe';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Survey Management")
@Controller('api/v1/surveys')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 surveys';
    }

    //get all surveys list
    @Get('fetch_surveys/all')
    getAllSurveys():Promise<any>{
        return this.surveyService.getAllSurveys();
    }

    //create a survey
    @Post('add_surveys')
    @UsePipes(new ValidationPipe())
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<any>{
        return this.surveyService.create(createSurveyDto)
    }

    @Delete("delete_survey/:survey_id")
    async deleteSurvey(
        @Param('survey_id',ParseIntPipe) survey_id:number,
    ):Promise<any>{
        return this.surveyService.deleteSurvey(survey_id)
    }
}
