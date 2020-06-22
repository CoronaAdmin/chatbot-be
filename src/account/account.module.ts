import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { AccountRepository } from './account.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
const jwtConfig = config.get('jwt');
@Module({
  imports:[
    TypeOrmModule.forFeature([Account,AccountRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
