'use strict';

const functions = require('firebase-functions');

const firebase = require("firebase");
require("firebase/firestore");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firestore);

const db = admin.firestore();

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

const {WebhookClient} = require('dialogflow-fulfillment');


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
   const agent = new WebhookClient({ request, response });

  function add_report (agent) {
       const report_data = {
            name: agent.parameters.project_name,
            report_date: agent.parameters.report_date,
            hours: agent.parameters.project_hours,
            comment: agent.parameters.project_comment
       }
        return db.collection("reports").add(report_data)
  };
    function add_date (agent) {
        conv.data
//       const report_data = {
//            report_date: agent.parameters.report_date
//       }
//       return db.collection("reports").add(report_data)
  };
  let intentMap = new Map();
  intentMap.set('Hub report - date', add_date)
  intentMap.set('Hub report - date - project name - hours - comment', add_report);
  agent.handleRequest(intentMap);
});


app.intent('Hub report - yes - project name - hours - comment - yes', (conv, params) => {

    const report_data = {
        name: "test",
        hours: "test",
        comment: "test"
    };


    return db.collection("reports").add(report_data)
        .then(result => {
            return conv.ask('Report was added.');
        })
        .catch(err => {
            console.error( err );
            return conv.close('I had a problem with the database. Try again later.');
        });
});