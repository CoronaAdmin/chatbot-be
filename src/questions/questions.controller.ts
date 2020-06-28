import { Controller, Get, Post, UsePipes, Body, Param, ParseIntPipe, Delete, Req } from '@nestjs/common';
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
    getAllQuestions(
        @Req() req,
    ):Promise<any>{
        return this.questionsService.getAllQuestions(req.user);
    }

    @Get('/fetch_questions/:surveyId')
    getSurveyQuestions(
        @Req() req,
        @Param('surveyId',ParseIntPipe) surveyId:number,
    ):Promise<any>{
        return this.questionsService.getSurveyQuestions(req.user,surveyId);
    }

    @Post("submit_question/:surveyId")
    @UsePipes(new ValidationPipe())
    async create(
        @Req() req,
        @Param('surveyId',ParseIntPipe) surveyId:number,
        @Body() createQuestionsDto: CreateQuestionsDto): Promise<any>{
        return this.questionsService.createQuestions(req.user,createQuestionsDto,surveyId)
    }

    @Delete("delete_question/:ques_id")
    async deleteQuestion(
        @Req() req,
        @Param('ques_id',ParseIntPipe) ques_id:number,
    ):Promise<any>{
        return this.questionsService.deleteQuestion(req.user,ques_id)
    }
}
