var NodeHelper = require('node_helper');
const axios = require('axios');
const es = require('./es.js');
const pt = require('./pt.js');

module.exports = NodeHelper.create ({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getESData: function() {
        var self = this;

        es.getesData(function(translationData) {
            self.sendSocketNotification("WOTD_ESP_DATA", translationData)
        });
    },

    getPTData: function() {
        var self = this;
        
        pt.getptData(function(translationData) {
            self.sendSocketNotification("WOTD_PT_DATA", translationData)
        });        
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification === "WOTD_GET_ES_DATA") {
            this.getESData(payload);
        }
        else if(notification === "WOTD_GET_PT_DATA") {
            this.getPTData(payload)
        } 
    }
})