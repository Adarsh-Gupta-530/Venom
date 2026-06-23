// backend/src/providers/GeminiProvider.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const AIProvider = require('./AIProvider');

class GeminiProvider extends AIProvider {
  constructor() {
    super();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Use the default Gemini flash model (or configurable via env)
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  // Helper for exponential backoff retries
  async _withRetry(fn, attempts = 3) {
    let delay = 500; // ms
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (err) {
        // Handle rate‑limit (429) or temporary network errors
        const isRateLimit = err.response && err.response.status === 429;
        if (i === attempts - 1) throw err;
        const wait = isRateLimit ? 2000 : delay;
        await new Promise(r => setTimeout(r, wait));
        delay *= 2; // exponential backoff
      }
    }
  }

  /**
   * Generate a full response (non‑streaming).
   * @param {{role:string, parts:{text:string}[]}[]} messages
   */
  async generateResponse(messages) {
    const { history, lastUserMessage } = this._splitMessages(messages);
    const chat = this.model.startChat({ history });
    return this._withRetry(() => chat.sendMessage(lastUserMessage));
  }

  /**
   * Stream tokens from Gemini.
   * Messages come in as: [{ role: 'user'|'model', parts: [{ text }] }, ...]
   * We use startChat with history (all but last), then sendMessageStream for the last user msg.
   * @param {{role:string, parts:{text:string}[]}[]} messages
   * @returns {AsyncGenerator<string>}
   */
  async *streamResponse(messages) {
    const { history, lastUserMessage } = this._splitMessages(messages);
    const chat = this.model.startChat({ history });

    const result = await this._withRetry(() =>
      chat.sendMessageStream(lastUserMessage)
    );

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  }

  _splitMessages(messages) {
    if (!messages || messages.length === 0) {
      return { history: [], lastUserMessage: '' };
    }
    
    // Convert standard {role, content} to Gemini {role, parts: [{text}]} format
    const geminiFormat = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // History is everything except the last message
    const history = geminiFormat.slice(0, -1);
    // The last message should be from the user
    const lastMsg = geminiFormat[geminiFormat.length - 1];
    const lastUserMessage = lastMsg.parts[0].text;
    return { history, lastUserMessage };
  }
}

module.exports = GeminiProvider;
