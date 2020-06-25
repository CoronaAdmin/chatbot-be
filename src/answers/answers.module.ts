import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswersRepository } from './answers.repository';
import { AccountRepository } from 'src/account/account.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([Answers,AnswersRepository,AccountRepository]),
    ],
    controllers: [AnswersController],
    providers: [AnswersService],
    exports:[AnswersService]
})
export class AnswersModule {}
