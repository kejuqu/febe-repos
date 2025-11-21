
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { username: string; content: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const newMessage = this.chatService.createMessage(
      data.username,
      data.content,
    );
    this.server.emit('newMessage', newMessage);
  }

  @SubscribeMessage('requestAllMessages')
  handleRequestAllMessages(@ConnectedSocket() client: Socket): void {
    client.emit('allMessages', this.chatService.getAllMessages());
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.emit('allMessages', this.chatService.getAllMessages());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
