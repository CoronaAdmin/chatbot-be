import { Controller, Get, Post, UsePipes, Body, Param, ParseIntPipe, Delete, Req, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ValidationPipe } from 'src/common/validation.pipe';
import { CreateQuestionsDto } from './dto/questions.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth-guard';

@ApiUseTags("Questions Management")
@Controller('/api/v1/questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 questions';
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('fetch_questions/all')
    getAllQuestions(
        @Req() req,
    ):Promise<any>{
        return this.questionsService.getAllQuestions(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('/fetch_questions/:surveyId')
    getSurveyQuestions(
        @Req() req,
        @Param('surveyId',ParseIntPipe) surveyId:number,
    ):Promise<any>{
        return this.questionsService.getSurveyQuestions(req.user,surveyId);
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post("submit_question/:surveyId")
    @UsePipes(new ValidationPipe())
    async create(
        @Req() req,
        @Param('surveyId',ParseIntPipe) surveyId:number,
        @Body() createQuestionsDto: CreateQuestionsDto): Promise<any>{
        return this.questionsService.createQuestions(req.user,createQuestionsDto,surveyId)
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Delete("delete_question/:ques_id")
    async deleteQuestion(
        @Req() req,
        @Param('ques_id',ParseIntPipe) ques_id:number,
    ):Promise<any>{
        return this.questionsService.deleteQuestion(req.user,ques_id)
    }
}
