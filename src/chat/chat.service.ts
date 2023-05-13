import { Injectable } from '@nestjs/common';
import { CompletionService } from 'src/openapi/completion/completion.service';

@Injectable()
export class ChatService {
  constructor(private readonly completionService: CompletionService) {}

  async send(message: string): Promise<string> {
    return await this.completionService.complete(message);
  }

  reset() {
    this.completionService.reset();
  }

  getHistoryFormatted(): string {
    return this.completionService.getHistoryFormatted();
  }
}
