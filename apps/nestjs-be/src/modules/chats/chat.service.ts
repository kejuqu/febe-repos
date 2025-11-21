// sse.service.ts
import { Injectable } from '@nestjs/common';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface ChatMessage {
  id: number;
  username: string;
  content: string;
  created_at: Date;
}

@Injectable()
export class ChatService {
  private readonly messages: ChatMessage[] = [];
  private nextId = 1;

  createMessage(username: string, content: string): ChatMessage {
    const newMessage: ChatMessage = {
      id: this.nextId++,
      username,
      content,
      created_at: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  getAllMessages(): ChatMessage[] {
    return this.messages;
  }

  streamPoemContent(chatId: string, message: string) {
    const poemPath = join(process.cwd(), './', 'src', 'constants', 'poem.txt');

    if (!existsSync(poemPath)) {
      throw new Error('poem.txt 文件不存在');
    }

    const content = readFileSync(poemPath, 'utf-8');
    const lines = content.split('\n').filter((line) => line.trim());

    return this.generateStream(lines);
  }

  private async *generateStream(lines: string[]): AsyncGenerator<string> {
    // 发送开始事件
    yield this.formatSSEMessage('start', { message: '开始推送内容' });

    // 逐行推送内容
    for (const line of lines) {
      if (line.trim()) {
        yield this.formatSSEMessage('chunk', {
          content: line,
          timestamp: new Date().toISOString(),
        });

        // 模拟延迟，让前端能看到逐行推送的效果
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // 发送结束事件
    yield this.formatSSEMessage('end', {
      message: '内容推送完成',
      completed: true,
    });
  }

  private formatSSEMessage(event: string, data: any): string {
    return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  }
}
