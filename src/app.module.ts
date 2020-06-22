import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './config/db.config';

@Module({
  
  imports: [TypeOrmModule.forRoot(DbConfig),
    AccountModule],
  controllers: [AccountController],
  
})
export class AppModule {}
