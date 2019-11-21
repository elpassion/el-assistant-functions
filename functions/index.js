'use strict';

const functions = require('firebase-functions');
const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
 } = require('actions-on-google');
const app = dialogflow({
    debug : true
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

app.intent('ABC', (conv, params) => {
    console.log("Starting with `what do you want to know?`");
    conv.ask(new SimpleResponse({
       speech:'Sorry, I do not know,
       text: 'Sorry, I do not know,
    }));
   conv.ask(new Suggestions(['Help me', 'Cancel',' Quit']));
});