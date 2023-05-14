import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OpenAPIModule } from './openapi/openapi.module';
import { ChatService } from './chat/chat.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenAPIModule, HealthModule],
  controllers: [AppController],
  providers: [ChatService],
})
export class AppModule {}