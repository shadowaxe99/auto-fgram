const axios = require('axios');

class RedditApi {
    constructor() {
        this.baseUrl = 'https://www.reddit.com';
    }

    async getTopPosts(subreddit, limit) {
        // Fetch top posts from a subreddit
        const response = await axios.get(`${this.baseUrl}/r/${subreddit}/top.json?limit=${limit}`);
        return response.data.data.children.map(post => ({
            id: post.data.id,
            title: post.data.title,
            upvotes: post.data.ups,
            comments: post.data.num_comments,
            awards: post.data.all_awardings,
            imageUrl: post.data.url_overridden_by_dest || post.data.thumbnail
        }));
    }

    async getTrendingTopics(subreddit) {
        // Fetch trending topics from a subreddit
        const response = await axios.get(`${this.baseUrl}/r/${subreddit}/hot.json?limit=5`);
        return response.data.data.children.map(post => post.data.title);
    }
}

module.exports = RedditApi;
