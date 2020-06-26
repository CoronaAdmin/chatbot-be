import { Controller, Get, Post, UsePipes, Body, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ValidationPipe } from 'src/common/validation.pipe';
import { CreateQuestionsDto } from './dto/questions.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Questions Management")
@Controller('/api/v1/questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 questions';
    }

    @Get('fetch_questions/all')
    getAllQuestions():Promise<any>{
        return this.questionsService.getAllQuestions();
    }

    @Get('/fetch_questions/:surveyId')
    getSurveyQuestions(
        @Param('surveyId',ParseIntPipe) surveyId:number,
    ):Promise<any>{
        return this.questionsService.getSurveyQuestions(surveyId);
    }

    @Post("submit_question/:surveyId")
    @UsePipes(new ValidationPipe())
    async create(
        @Param('surveyId',ParseIntPipe) surveyId:number,
        @Body() createQuestionsDto: CreateQuestionsDto): Promise<any>{
        return this.questionsService.createQuestions(createQuestionsDto,surveyId)
    }
}
