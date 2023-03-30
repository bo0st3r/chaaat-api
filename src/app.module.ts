import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OpenAPIModule } from './openapi/openapi.module';
import { SentenceService } from './sentence/sentence.service';

@Module({
  imports: [ConfigModule.forRoot(), OpenAPIModule],
  controllers: [AppController],
  providers: [SentenceService],
})
export class AppModule {}
