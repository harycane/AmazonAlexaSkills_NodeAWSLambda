

/**
 * App ID for the skill
 */
var APP_ID = 'Enter your application id present in the skill info of the AMAZON developer console'; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var https = require('https');

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');


/**
 * FitnessSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FitnessSkill = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FitnessSkill.prototype = Object.create(AlexaSkill.prototype);
FitnessSkill.prototype.constructor = FitnessSkill;

FitnessSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("FitnessSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
};

FitnessSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("FitnessSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

FitnessSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};

FitnessSkill.prototype.intentHandlers = {

    "GetFirstEventIntent": function (intent, session, response) {
        handleFirstEventRequest(intent, session, response);
    },
//Two shot conversational model voice experience
    "GetNextEventIntent": function (intent, session, response) {
        handleNextEventRequest(intent, session, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "Helping. Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
        var repromptText = "Just say chest, abs, cardio or yoga workout.";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Stopping. Keep your body sharp to keep your mind sharp. Take Care.",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Cancelling. Keep your body sharp to keep your mind sharp. Take Care.",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    }
};

/**
 * Function to handle the onLaunch skill behavior
 */

function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var cardTitle = "Welcome";
    var repromptText = "Just say chest, abs, cardio or yoga workout.";
    var speechText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
    var cardOutput = speechOutput;
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardOutput);

}

function handleFirstEventRequest(intent, session, response) {

    var sessionAttributes = {};


      //Getting user input of workout type to be either chest, cardio, abs or yoga.
        var destination = intent.slots.Destination.value;

        if("cardio" === destination){
          handleCardioRequest(intent, session, response);
        } else if ("abs" === destination){
          handleAbsRequest(intent, session, response);

        } else if ("chest" === destination){
          handleChestRequest(intent, session, response);

        } else if ("yoga" === destination){
          handleYogaRequest(intent, session, response);
          } else {
              var handleSpeechText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
              var handleRepromptText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
            var handleSpeechOutput = {
                speech: "<speak>" + handleSpeechText + "</speak>",
                type: AlexaSkill.speechOutputType.SSML
            };
            var handleRepromptOutput = {
                speech: handleRepromptText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(handleSpeechOutput, handleRepromptOutput);
          }

}






/**
 * Gets a poster prepares the speech to reply to the user.
 */
function handleNextEventRequest(intent, session, response) {
        //Two shot conversational experience, previous session continues
        sessionAttributes = session.attributes,

        repromptText = "Do you want to continue exercising cardio, chest, abs or yoga?",
        i;

        //Getting user input of workout type to be either chest, cardio, abs or yoga.
              var destination2 = intent.slots.Destination.value;

              if("cardio" === destination2){
                handleCardioRequest(intent, session, response);
              } else if ("abs" === destination2){
                handleAbsRequest(intent, session, response);

              } else if ("chest" === destination2){
                handleChestRequest(intent, session, response);

              } else if ("yoga" === destination2){
                handleYogaRequest(intent, session, response);
                } else {
              var handleSpeechText2 = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
              var handleRepromptText2 = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";
            var handleSpeechOutput2 = {
                speech: "<speak>" + handleSpeechText2 + "</speak>",
                type: AlexaSkill.speechOutputType.SSML
            };
            var handleRepromptOutput2 = {
                speech: handleRepromptText2,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(handleSpeechOutput2, handleRepromptOutput2);
          }


}



function handleCardioRequest(intent, session, response) {
  var speechText = "Welcome to the cardio workout. Perform as many star jumps as possible, as I count down from twenty-five. Ready. Steady. Go. Twenty-Five. Twenty-Four. Twenty-Three. Twenty-Two. Twenty-One. Twenty. Nineteen. Eighteen. Seventeen. Sixteen. Fifteen. Fourteen. Thirteen. Twelve. Eleven. Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One. You deserve to rest for five seconds. <break time='5s'/> To continue exercising, please mention either cardio, chest, abs, or yoga?";
  var repromptText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";

//Since break time is present, we have to use SSML
  var speechOutput = {
    speech: "<speak>" + speechText + "</speak>",
    type: AlexaSkill.speechOutputType.SSML
  };
  var repromptOutput = {
      speech: repromptText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };
  response.ask(speechOutput, repromptOutput);
}


function handleAbsRequest(intent, session, response) {
  var speechText2 = "Welcome to the abs workout. Perform as many crunches as possible, as I count down from twenty-five. Ready. Steady. Go. Twenty-Five. Twenty-Four. Twenty-Three. Twenty-Two. Twenty-One. Twenty. Nineteen. Eighteen. Seventeen. Sixteen. Fifteen. Fourteen. Thirteen. Twelve. Eleven. Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One. You deserve to rest for five seconds. <break time='5s'/> To continue exercising, please mention either cardio, chest, abs, or yoga?";
  var repromptText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";

  //Since break time is present, we have to use SSML
  var speechOutput2 = {
    speech: "<speak>" + speechText2 + "</speak>",
    type: AlexaSkill.speechOutputType.SSML
  };
  var repromptOutput2 = {
      speech: repromptText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };
  response.ask(speechOutput2, repromptOutput2);

}

function handleChestRequest(intent, session, response) {
  var speechText3 = "Welcome to the chest workout. Perform as many push-ups as possible, as I count down from twenty-five. Ready. Steady. Go. Twenty-Five. Twenty-Four. Twenty-Three. Twenty-Two. Twenty-One. Twenty. Nineteen. Eighteen. Seventeen. Sixteen. Fifteen. Fourteen. Thirteen. Twelve. Eleven. Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One. You deserve to rest for five seconds. <break time='5s'/> To continue exercising, please mention either cardio, chest, abs, or yoga?";
  var repromptText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";

  //Since break time is present, we have to use SSML
  var speechOutput3 = {
    speech: "<speak>" + speechText3 + "</speak>",
    type: AlexaSkill.speechOutputType.SSML
  };
  var repromptOutput3 = {
      speech: repromptText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };
  response.ask(speechOutput3, repromptOutput3);

}

function handleYogaRequest(intent, session, response) {
  var speechText4 = "Welcome to the yoga workout. Perform as many cobra stretches as possible, as I count down from twenty-five. Ready. Steady. Go. Twenty-Five. Twenty-Four. Twenty-Three. Twenty-Two. Twenty-One. Twenty. Nineteen. Eighteen. Seventeen. Sixteen. Fifteen. Fourteen. Thirteen. Twelve. Eleven. Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One. You deserve to rest for five seconds. <break time='5s'/> To continue exercising, please mention either cardio, chest, abs, or yoga?";
  var repromptText = "Welcome to Fitness Thirty, please say the workout you would like to do today. Just say chest, abs, cardio or yoga workout.";

  //Since break time is present, we have to use SSML
  var speechOutput4 = {
    speech: "<speak>" + speechText4 + "</speak>",
    type: AlexaSkill.speechOutputType.SSML
  };
  var repromptOutput4 = {
      speech: repromptText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };
  response.ask(speechOutput4, repromptOutput4);
}


exports.handler = function (event, context) {
    // Create an instance of the FitnessSkill Skill.
    var skill = new FitnessSkill();
    skill.execute(event, context);
};
