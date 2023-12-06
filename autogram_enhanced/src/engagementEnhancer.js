const OpenAIAPI = require('./openaiapi');

class EngagementEnhancer {
    constructor() {
        this.openaiapi = new OpenAIAPI();
    }

    async generateCallToAction(userPreferences) {
        // Generate a call to action using OpenAI's GPT-3, customized based on user preferences
        const preferences = userPreferences.join(', ');
        const prompt = `Write a compelling call to action for an Instagram post about the following topics: ${preferences}.`;
        const callToAction = await this.openaiapi.generateText(prompt);
        return callToAction;
    }

    async promptUserInteraction(userPreferences) {
        // Generate a question or statement to encourage comments using OpenAI's GPT-3, customized based on user preferences
        const preferences = userPreferences.join(', ');
        const prompt = `Write a question or statement that encourages comments on an Instagram post about the following topics: ${preferences}.`;
        const interactionPrompt = await this.openaiapi.generateText(prompt);
        return interactionPrompt;
    }
}

module.exports = EngagementEnhancer;
