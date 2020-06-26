import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswersDto } from './dto/answers.dto';
import { AnswersRepository } from './answers.repository';
import { AccountRepository } from 'src/account/account.repository';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswersRepository)
        private readonly answersRepository:AnswersRepository,
        private readonly accountRepository:AccountRepository
      ) {}

    async submitUserResponse(user:any,data:CreateAnswersDto,userid:number) {
      if(user.type==='ashaworker')
      {
        return this.answersRepository.submitResponse(user,data,userid,this.accountRepository)
      }
    }
    async getUserResponse(user:any,userid:number){
      if(user.type === 'ashaworker'){
      return this.answersRepository.getUserResponse(user,userid,this.accountRepository)
      }
    }
}


