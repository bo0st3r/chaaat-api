import {
  Body,
  Controller,
  createParamDecorator,
  Get,
  HttpException,
  HttpStatus,
  ParseBoolPipe,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { SentenceService } from './sentence/sentence.service';
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
  constructor(private readonly sentenceService: SentenceService) {}

  @Post('chat')
  async generateSentences(
    @PlainBody() message: string,
    //@PlainBody() message: string,
    @Query('reset', ParseBoolPipe) reset?: boolean,
  ): Promise<string> {
    if (reset) {
      await this.sentenceService.resetHistory();
    }

    try {
      return await this.sentenceService.generateSentences(message);
    } catch (error) {
      console.error(error);
      return 'Error';
    }
  }

  @Get('history')
  getHistoryFormatted(): string {
    return this.sentenceService.getHistoryFormatted();
  }
}
