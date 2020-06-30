import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswersRepository } from './answers.repository';
import { AccountRepository } from 'src/account/account.repository';
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin';
import { AnswersAdmin } from './answers.admin';

@Module({
    imports:[
        TypeOrmModule.forFeature([Answers,AnswersRepository,AccountRepository]),
        DefaultAdminModule
    ],
    controllers: [AnswersController],
    providers: [AnswersService],
    exports:[AnswersService]
})
export class AnswersModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        
        adminSite.register('Answers', AnswersAdmin)
      }
}
