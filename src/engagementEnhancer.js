const OpenAIAPI = require('./openaiapi');

class EngagementEnhancer {
    constructor() {
        this.openaiapi = new OpenAIAPI();
    }

    async generateCallToAction() {
        // Generate a call to action using OpenAI's GPT-3
        const prompt = 'Write a compelling call to action for an Instagram post.';
        const callToAction = await this.openaiapi.generateText(prompt);
        return callToAction;
    }

    async promptUserInteraction() {
        // Generate a question or statement to encourage comments using OpenAI's GPT-3
        const prompt = 'Write a question or statement to encourage comments on an Instagram post.';
        const interactionPrompt = await this.openaiapi.generateText(prompt);
        return interactionPrompt;
    }
}

module.exports = EngagementEnhancer;
