// backend/src/providers/MockProvider.js
const AIProvider = require('./AIProvider');

class MockProvider extends AIProvider {
  constructor() {
    super();
    this.name = 'mock';
    this.dummyResponse = 'This is a mock Gemini response for testing purposes.';
  }

  async generateResponse(messages) {
    // ignore input, return dummy response
    return { text: this.dummyResponse };
  }

  async *streamResponse(messages) {
    // Simulate token streaming by splitting words
    const tokens = this.dummyResponse.split(' ');
    for (const token of tokens) {
      await new Promise(r => setTimeout(r, 100)); // simulate delay
      yield token + ' ';
    }
  }
}

module.exports = MockProvider;
