import { Controller, Get, Body, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageDto } from './dto/messageDto.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Chatbot Management")
@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}
    @Post('/send-msg')
    welcome(
        @Body() message:MessageDto
    ):Promise<any> {
        return this.chatbotService.runSample(message.message)
    }
}
