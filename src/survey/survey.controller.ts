import { Controller,Get,Post,Body, UsePipes, Delete, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import { ValidationPipe } from '../common/validation.pipe';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth-guard';

@ApiUseTags("Survey Management")
@Controller('api/v1/surveys')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 surveys';
    }

    //get all surveys list
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('fetch_surveys/all')
    getAllSurveys(
        @Req() req
    ):Promise<any>{
        return this.surveyService.getAllSurveys(req.user);
    }

    //create a survey
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add_surveys')
    @UsePipes(new ValidationPipe())
    async create(@Body() createSurveyDto: CreateSurveyDto,@Req() req): Promise<any>{
        return this.surveyService.create(req.user,createSurveyDto)
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Delete("delete_survey/:survey_id")
    async deleteSurvey(
        @Req() req,
        @Param('survey_id',ParseIntPipe) survey_id:number,
    ):Promise<any>{
        return this.surveyService.deleteSurvey(req.user,survey_id)
    }
}
