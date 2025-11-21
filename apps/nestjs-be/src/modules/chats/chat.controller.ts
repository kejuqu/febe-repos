// sse.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  Header,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from '@/modules/chats/chat.service';

interface SseRequest {
  chat_id: string;
  scenario: string;
  tools: Array<{ type: string; search: any }>;
  message: {
    parent_id: string;
    role: string;
    blocks: Array<{ message_id: string; text: { content: string } }>;
    scenario: string;
  };
  options: { thinking: boolean };
}

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  getAllMessages() {
    return this.chatService.getAllMessages();
  }

  @Post('sse')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', 'Cache-Control')
  async handleSSE(@Body() body: SseRequest, @Res() res: Response) {
    try {
      const { chat_id, message } = body;
      const userMessage = message.blocks[0]?.text?.content || '';

      console.log(`收到 SSE 请求 - Chat ID: ${chat_id}, 消息: ${userMessage}`);

      res.writeHead(HttpStatus.OK, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });

      // 立即发送连接成功消息
      res.write('event: connected\ndata: {"message": "连接成功"}\n\n');

      const stream = this.chatService.streamPoemContent(chat_id, userMessage);

      for await (const chunk of stream) {
        res.write(chunk);
      }

      res.end();
    } catch (error) {
      console.error('SSE 错误:', error);
      res.write(
        `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`,
      );
      res.end();
    }
  }
}
