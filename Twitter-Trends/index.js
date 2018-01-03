// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * Twitter API Keys
 **/
var TWITTER_CONFIG = {
        "consumerKey": "Enter the consumerKey of the application you created in apps.twitter.com",
        "consumerSecret": "Enter the consumerSecret of the application you created in apps.twitter.com",
        "accessToken": "Enter the accessToken you generated for your application on apps.twitter.com",
        "accessTokenSecret": "Enter the accessTokenSecret you generated for your application on apps.twitter.com"
        //"callBackUrl": "XXX"
    }, twitterClient = null;
/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Use the aws-lib
 */
var aws = require("aws-lib");

/**
 * Use the Twitter library
 */
var Twitter = require("twitter-node-client").Twitter;


/**
 * TwitterSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
 var APP_ID = 'Enter the application id present in the Skill info tab of the AMAZON developer console';

var TwitterSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TwitterSkill.prototype = Object.create(AlexaSkill.prototype);
TwitterSkill.prototype.constructor = TwitterSkill;

TwitterSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("TwitterSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    twitterClient = new Twitter(TWITTER_CONFIG);

    // any session init logic would go here
};

TwitterSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TwitterSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getTrends(response);
};

TwitterSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("TwitterSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any session cleanup logic would go here
};

TwitterSkill.prototype.intentHandlers = {
    Trends: function (intent, session, response) {
        getTrends(intent, session, response);
    },
};
/**
 * Returns the welcome response for when a user invokes this skill.
 */

function getTrends(response) {
    var trendString = "Here are the top trendng topics in your Area.";
    // resource url from the reference --> https://dev.twitter.com/rest/reference/get/trends/place
    //id is Yahoo's Where on Earth Id for San Francisco
    twitterClient.getCustomApiCall('/trends/place.json',{"id":2487956},
        function (err,response,body) {
            trendString = "There was an error.";
        },
        function (data) {
            data = JSON.parse(data);
            //trendString = data[0].trends[0].name;
            //get top 10 trending topics
            for(var i = 0; i< 10; i++) {
                trendString = trendString +", "+ data[0].trends[i].name;
            }
        response.tell(trendString);
        }
    );

}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var twitterSkill = new TwitterSkill();
    twitterSkill.execute(event, context);
};
