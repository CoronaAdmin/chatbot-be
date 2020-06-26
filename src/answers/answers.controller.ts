import { Controller, Get, Post, UsePipes, Param, ParseIntPipe, Body, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswersDto } from './dto/answers.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Answers Management")
@Controller('api/v1/response')
export class AnswersController {

    constructor(private readonly answersService: AnswersService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 user responses';
    }

    //get the response of the particular user
    @Get('fetch_response/:userid')
    getUserResponseById(@Req() req,@Param('userid',ParseIntPipe) userid:number):Promise<any>{
        return this.answersService.getUserResponse(req.user,userid);
    }

    //submit the user response
    @Post("submit_response/:userId")
    async create(
        @Req() req,
        @Param('userId',ParseIntPipe) userId:number,
        @Body() createAnswersDto:CreateAnswersDto ): Promise<any>{
        return this.answersService.submitUserResponse(req.user,createAnswersDto,userId)
    }
}
