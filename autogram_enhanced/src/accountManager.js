const axios = require('axios');
const InstagramApi = require('./instagramApi.js');

class AccountManager {
    constructor() {
        this.accounts = {};
        this.currentAccount = null;
    }

    addAccount(userId, accessToken) {
        this.accounts[userId] = accessToken;
    }

    removeAccount(userId) {
        delete this.accounts[userId];
    }

    switchAccount(userId) {
        if (this.accounts[userId]) {
            this.currentAccount = new InstagramApi(this.accounts[userId]);
        } else {
            throw new Error('Account not found');
        }
    }

    getCurrentAccount() {
        return this.currentAccount;
    }
}

module.exports = AccountManager;
