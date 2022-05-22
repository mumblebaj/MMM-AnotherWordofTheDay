var NodeHelper = require('node_helper');
const axios = require('axios');
const wotd = require('./de.js');

module.exports = NodeHelper.create ({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getData: function(url) {
        var self = this;
        
        wotd.getData(function(translationData) {
            self.sendSocketNotification("WOTD_DATA", translationData)
        }, url);        
    },

    socketNotificationReceived: function(notification, payload) {

        const language = this.payload.language
        language.forEach(lang => {
            var url = `https://www.${lang}pod101.com/${lang}-phrases/`
            this.getData(url)
        })
    }
})