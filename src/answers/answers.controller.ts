import { Controller, Get, Post, UsePipes, Param, ParseIntPipe, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswersDto } from './dto/answers.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Answers Management")
@Controller('answers')
export class AnswersController {

    constructor(private readonly answersService: AnswersService) {}

    @Get()
    welcome(): string {
        return 'Welcome to COVID-19 user responses';
    }

    //get the response of the particular user
    @Get('/:userid')
    getUserResponseById(@Param('userid',ParseIntPipe) userid:number):Promise<any>{
        return this.answersService.getUserResponse(userid);
    }

    @Post("/:userId")
    async create(
        @Param('userId',ParseIntPipe) userId:number,
        @Body() createAnswersDto:CreateAnswersDto ): Promise<any>{
        return this.answersService.submitUserResponse(createAnswersDto,userId)
    }
}
