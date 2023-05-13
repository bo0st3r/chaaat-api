import {
  Controller,
  createParamDecorator,
  Get,
  HttpException,
  HttpStatus,
  ParseBoolPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import * as rawbody from 'raw-body';

export const PlainBody = createParamDecorator(async (data, req) => {
  if (!req.args[0].readable) {
    throw new HttpException(
      'Body is not readable',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return (await rawbody(req.args[0])).toString().trim();
});

@Controller()
export class AppController {
  constructor(private readonly sentenceService: ChatService) {}

  @Post('chat')
  async sendMessage(
    @PlainBody() message: string,
    @Query('reset', ParseBoolPipe) reset?: boolean,
  ): Promise<string> {
    if (reset) {
      await this.sentenceService.reset();
    }

    try {
      return await this.sentenceService.send(message);
    } catch (error) {
      console.error(error);
      return 'Error';
    }
  }

  @Get('reset')
  resetChat(): void {
    this.sentenceService.reset();
  }

  @Get('history')
  getHistoryFormatted(): string {
    return this.sentenceService.getHistoryFormatted();
  }
}
