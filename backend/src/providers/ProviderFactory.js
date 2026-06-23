// backend/src/providers/ProviderFactory.js
const AIProvider = require('./AIProvider');
const GeminiProvider = require('./GeminiProvider');
const OpenAIProvider = require('./OpenAIProvider');
const GroqProvider = require('./GroqProvider');

class ProviderFactory {
  /**
   * Returns an instance of the configured AI provider.
   * The provider is selected via the AI_PROVIDER environment variable.
   * Default: 'gemini'
   */
  static getProvider() {
    const providerName = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
    switch (providerName) {
      case 'gemini':
        return new GeminiProvider();
      case 'openai': 
        return new OpenAIProvider();
      case 'groq':
        return new GroqProvider();
      // case 'claude': return new ClaudeProvider();
      // case 'deepseek': return new DeepSeekProvider();
      default:
        throw new Error(`Unsupported AI provider: ${providerName}`);
    }
  }
}

module.exports = ProviderFactory;
