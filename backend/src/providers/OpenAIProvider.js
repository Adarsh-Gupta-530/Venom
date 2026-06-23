// backend/src/providers/OpenAIProvider.js
const OpenAI = require('openai');
const AIProvider = require('./AIProvider');

class OpenAIProvider extends AIProvider {
  constructor() {
    super();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable not set');
    }
    this.openai = new OpenAI({ apiKey });
    this.modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini'; // default to a fast model
  }

  async generateResponse(messages) {
    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: messages,
    });
    return response.choices[0].message.content;
  }

  async *streamResponse(messages) {
    const stream = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  }
}

module.exports = OpenAIProvider;
