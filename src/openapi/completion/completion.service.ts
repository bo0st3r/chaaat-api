import { Injectable } from '@nestjs/common';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

const DEFAULT_HISTORY: ChatCompletionRequestMessage[] = [
  {
    role: 'system',
    content:
      'You are a useful assistant who gives efficient and (kind of) concise answers.',
  },
];

const history: ChatCompletionRequestMessage[] = [...DEFAULT_HISTORY];

@Injectable()
export class CompletionService {
  constructor(private readonly openAi: OpenAIApi) {}

  reset(): void {
    history.length = 0;
    history.push(...DEFAULT_HISTORY);
  }

  async complete(message: string): Promise<string> {
    const formattedMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content: message.trim(),
    };

    const model = process.env['CHAT_COMPLETION_MODEL'] || 'gpt-4';
    const maxTokens = Number(process.env['CHAT_COMPLETION_MAX_TOKENS']) || 8160;

    const response = await this.openAi.createChatCompletion({
      model,
      messages: [...history, formattedMessage],
      //max_tokens: maxTokens,
    });

    const firstChoice = response.data.choices[0];
    if (!firstChoice.message) {
      throw new Error('No text in first choice');
    }

    const firstChoiceContent = firstChoice.message.content;
    const formattedResponse: ChatCompletionRequestMessage = {
      role: 'system',
      content: firstChoiceContent,
    };

    history.push(formattedMessage);
    history.push(formattedResponse);

    return firstChoiceContent;
  }

  getHistoryFormatted(): string {
    return history
      .map((message) => `${message.role}: ${message.content}`)
      .join('\n');
  }
}
