import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswersDto } from './dto/answers.dto';
import { AnswersRepository } from './answers.repository';
import { AccountRepository } from 'src/account/account.repository';
import { QuestionsRepository } from 'src/questions/questions.repository';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswersRepository)
        private readonly answersRepository:AnswersRepository,
        private readonly accountRepository:AccountRepository,
        private readonly questionsRepository:QuestionsRepository,
      ) {}

    async submitUserResponse(user:any,data:CreateAnswersDto,userid:number) {
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
        return this.answersRepository.submitResponse(data,userid,this.accountRepository)
    }
    async getUserResponse(user:any,userid:number){
      if(user.type!=='ashaworker'){
        throw new UnauthorizedException({detail:'User Not Authorized'})
      }
      return this.answersRepository.getUserResponse(userid,this.accountRepository)
    }
    async downloadCsv(res:any):Promise<any>{
      return this.answersRepository.downloadCsv(this.questionsRepository,res);
    }
}


