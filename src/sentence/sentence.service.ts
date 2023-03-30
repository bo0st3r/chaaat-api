import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/openapi/chat/chat.service';

@Injectable()
export class SentenceService {
  constructor(private readonly chatService: ChatService) {}

  async generateSentences(message: string): Promise<string> {
    return await this.chatService.generateSentences(message);
  }

  resetHistory() {
    this.chatService.resetHistory();
  }

  getHistoryFormatted(): string {
    return this.chatService.getHistoryFormatted();
  }
}
