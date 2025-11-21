import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// const v = {
//   chat_id: '19a9a0a5-df82-8f0d-8000-09145e953ddf',
//   scenario: 'SCENARIO_CHAT',
//   tools: [{ type: 'TOOL_TYPE_SEARCH', search: {} }],
//   message: {
//     parent_id: '19a9a0a5-e3b2-857d-8000-0a1441a0b4e9',
//     role: 'user',
//     blocks: [{ message_id: '', text: { content: '未来我们还可以细水长流嘛' } }],
//     scenario: 'SCENARIO_K2',
//   },
//   options: { thinking: false },
//   kimiplus_id: 'promo',
// };
