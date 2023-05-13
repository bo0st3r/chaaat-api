import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { CompletionService } from './completion/completion.service';

function provideOpenAIApi(): OpenAIApi {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
    //baseOptions:
  });

  return new OpenAIApi(configuration);
}

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    CompletionService,
    {
      provide: OpenAIApi,
      useValue: provideOpenAIApi(),
    },
  ],
  exports: [CompletionService],
})
export class OpenAPIModule {}
