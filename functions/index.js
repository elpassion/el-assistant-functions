'use strict';

const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
   apiKey: "AIzaSyAfJKotm2CJllKceY7DTQtDTTh5ejnMjEA",
   authDomain: "el-assistant.firebaseapp.com",
   databaseURL: "https://el-assistant.firebaseio.com",
   projectId: "el-assistant",
   storageBucket: "el-assistant.appspot.com",
   messagingSenderId: "1024141565851",
   appId: "1:1024141565851:web:b4462fae24ba210080cb3e"
};

firebase.initializeApp(firebaseConfig);

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
       speech:'Sorry, I do not know`,
       text: 'Sorry, I do not know`,
    }));
   conv.ask(new Suggestions(['Help me', 'Cancel',' Quit']));
});