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

    async submitUserResponse(data:CreateAnswersDto,userid:number) {
        return this.answersRepository.submitResponse(data,userid,this.accountRepository)
      }
    async getUserResponse(userid:number){
      return this.answersRepository.getUserResponse(userid,this.accountRepository)
    }
}


