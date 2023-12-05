const axios = require('axios');

class InstagramApi {
    constructor() {
        this.baseUrl = 'https://api.instagram.com';
        this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    }

    async postImage(imageUrl, caption) {
        // Post an image to Instagram
        const response = await axios.post(`${this.baseUrl}/v1/media`, {
            access_token: this.accessToken,
            image_url: imageUrl,
            caption: caption
        });
        return response.data.id;
    }

    async getComments(mediaId) {
        // Get comments for a media item
        const response = await axios.get(`${this.baseUrl}/v1/media/${mediaId}/comments`, {
            params: { access_token: this.accessToken }
        });
        return response.data.data;
    }

    async likeComment(commentId) {
        // Like a comment on Instagram
        await axios.post(`${this.baseUrl}/v1/media/${commentId}/likes`, {
            access_token: this.accessToken
        });
    }

    async postComment(mediaId, text) {
        // Post a comment on Instagram
        await axios.post(`${this.baseUrl}/v1/media/${mediaId}/comments`, {
            access_token: this.accessToken,
            text: text
        });
    }
}

module.exports = InstagramApi;
