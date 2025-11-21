// sse.module.ts
import { Module } from '@nestjs/common';
import { ChatController } from '@/modules/chats/chat.controller';
import { ChatService } from '@/modules/chats/chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
