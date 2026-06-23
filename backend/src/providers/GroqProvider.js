// backend/src/providers/GroqProvider.js
const OpenAI = require('openai');
const AIProvider = require('./AIProvider');

class GroqProvider extends AIProvider {
  constructor() {
    super();
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable not set');
    }
    // Groq's API is OpenAI-compatible, so we reuse the openai SDK
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    this.modelName = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  async generateResponse(messages) {
    const response = await this.client.chat.completions.create({
      model: this.modelName,
      messages,
    });
    return response.choices[0].message.content;
  }

  async *streamResponse(messages) {
    const stream = await this.client.chat.completions.create({
      model: this.modelName,
      messages,
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

module.exports = GroqProvider;
