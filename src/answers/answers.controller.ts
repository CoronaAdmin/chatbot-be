import { Controller, Get, Post, UsePipes, Param, ParseIntPipe, Body, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswersDto } from './dto/answers.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth-guard';

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
    @UseGuards(new AuthGuard())
    getUserResponseById(@Req() req,@Param('userid',ParseIntPipe) userid:number):Promise<any>{
        return this.answersService.getUserResponse(req.user,userid);
    }

    @Post("/:userId")
    @UseGuards(new AuthGuard())
    async create(
        @Req() req,
        @Param('userId',ParseIntPipe) userId:number,
        @Body() createAnswersDto:CreateAnswersDto ): Promise<any>{
        return this.answersService.submitUserResponse(req.user,createAnswersDto,userId)
    }
}
