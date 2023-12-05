const OpenAIAPI = require('./openaiapi');

class HashtagGenerator {
    constructor() {
        this.openaiapi = new OpenAIAPI();
    }

    async generateHashtags(topic) {
        // Generate hashtags using OpenAI's GPT-3
        const prompt = `Generate hashtags for an Instagram post about ${topic}.`;
        const hashtags = await this.openaiapi.generateText(prompt);
        return hashtags.split(' ').filter(tag => tag.startsWith('#'));
    }
}

module.exports = HashtagGenerator;
