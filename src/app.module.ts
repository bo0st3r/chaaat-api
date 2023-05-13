import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OpenAPIModule } from './openapi/openapi.module';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [ConfigModule.forRoot(), OpenAPIModule],
  controllers: [AppController],
  providers: [ChatService],
})
export class AppModule {}
