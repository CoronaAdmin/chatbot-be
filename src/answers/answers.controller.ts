import { Controller, Get, Post, UsePipes, Param, ParseIntPipe, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswersDto } from './dto/answers.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth-guard';

@ApiUseTags("Answers Management")
@Controller('api/v1/response')
export class AnswersController {

    constructor(private readonly answersService: AnswersService) {}

    @Get('/welcome')
    welcome(): string {
        return 'Welcome to COVID-19 user responses';
    }

    //get the response of the particular user
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('fetch_response/:userid')
    getUserResponseById(@Req() req,@Param('userid',ParseIntPipe) userid:number):Promise<any>{
        return this.answersService.getUserResponse(req.user,userid);
    }

    //submit the user response
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post("submit_response/:userId")
    async create(
        @Req() req,
        @Param('userId',ParseIntPipe) userId:number,
        @Body() createAnswersDto:CreateAnswersDto ): Promise<any>{
        return this.answersService.submitUserResponse(req.user,createAnswersDto,userId)
    }

//    @ApiBearerAuth()
//    @UseGuards(new AuthGuard())
    @Post("downloadAnswersCsv")
    download(@Res() res,){
        return this.answersService.downloadCsv(res)
    }
}
