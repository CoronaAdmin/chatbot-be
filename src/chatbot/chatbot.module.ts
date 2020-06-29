import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
    controllers: [ChatbotController],
    providers: [ChatbotService],
    exports:[ChatbotService]
})
export class ChatbotModule {}
