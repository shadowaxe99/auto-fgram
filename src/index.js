require('dotenv').config();
const RedditApi = require('./redditApi');
const InstagramApi = require('./instagramApi');
const ContentSelector = require('./contentSelector');
const EngagementEnhancer = require('./engagementEnhancer');
const HashtagGenerator = require('./hashtagGenerator');
const AnalyticsTracker = require('./analyticsTracker');
const CommunityInteractor = require('./communityInteractor');
const CrossPromoter = require('./crossPromoter');
const ComplianceManager = require('./complianceManager');
const CustomizationManager = require('./customizationManager');
const Database = require('./database');
const databaseInstance = new Database();

// Initialize APIs and modules
const redditApi = new RedditApi();
const instagramApi = new InstagramApi();
const contentSelector = new ContentSelector(redditApi);
const engagementEnhancer = new EngagementEnhancer();
const hashtagGenerator = new HashtagGenerator();
const analyticsTracker = new AnalyticsTracker(databaseInstance);
const communityInteractor = new CommunityInteractor(instagramApi);
const crossPromoter = new CrossPromoter({ instagram: instagramApi });
const complianceManager = new ComplianceManager(redditApi, instagramApi);
const customizationManager = new CustomizationManager(databaseInstance);

async function runAutogram() {
    // This is the main function that will run the autogram script
    // Fetch high-engagement content from Reddit
    const posts = await contentSelector.fetchHighEngagementPosts('subredditName');

    // Enhance engagement with generated text
    const callToAction = await engagementEnhancer.generateCallToAction();
    const interactionPrompt = await engagementEnhancer.promptUserInteraction();

    // Generate hashtags
    const hashtags = await hashtagGenerator.generateHashtags('topicName');

    // Post to Instagram and track performance
    for (const post of posts) {
        const caption = `${post.title}\n\n${callToAction}\n\n${interactionPrompt}\n\n${hashtags.join(' ')}`;
        const mediaId = await instagramApi.postImage(post.imageUrl, caption);
        await analyticsTracker.trackPostPerformance(mediaId);

        // Interact with the community
        await communityInteractor.likeComments(mediaId);
        await communityInteractor.replyToUsers(mediaId, 'Thank you for your comment, {username}!');

        // Cross-promote the post
        await crossPromoter.promoteOnPlatform('twitter', post);

        // Ensure compliance with platform rules
        complianceManager.checkCompliance();
    }

    // Handle user customization
    const userPreferences = customizationManager.getUserPreferences('userId');
    console.log('User Preferences:', userPreferences);
}

runAutogram().catch(console.error);
