// backend/src/providers/AIProvider.js
class AIProvider {
  /**
   * Generate a full response from the model.
   * @param {{role:string, content:string}[]} messages
   * @returns {Promise<any>}
   */
  async generateResponse(messages) {
    throw new Error('generateResponse not implemented');
  }

  /**
   * Stream response tokens from the model.
   * @param {{role:string, content:string}[]} messages
   * @returns {AsyncGenerator<string>}
   */
  async *streamResponse(messages) {
    throw new Error('streamResponse not implemented');
  }
}

module.exports = AIProvider;
