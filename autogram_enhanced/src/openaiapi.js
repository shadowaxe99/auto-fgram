const { OpenAIAPI } = require('openai');

class OpenAIAPI {
    constructor() {
        this.api = new OpenAIAPI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async generateText(prompt) {
        // Generate text using OpenAI's GPT-3
        const response = await this.api.Completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 50
        });
        return response.choices[0].text.trim();
    }
}

module.exports = OpenAIAPI;
