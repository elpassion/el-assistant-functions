'use strict';

const functions = require('firebase-functions');
const firebase = require("firebase");
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
    "debug": true,
});

app.intent('hub - date', (conv, params) => {
    conv.data.report_date = conv.parameters['report_date'];
});

app.intent('hub - date - name', (conv, params) => {
    conv.data.project_name = conv.parameters['project_name'];
});

app.intent('hub - date - name - hours', (conv, params) => {
    conv.data.hours = conv.parameters['project_hours'];
});

app.intent('hub - date - name - hours - comment', (conv, params) => {
    conv.data.comment = conv.parameters['project_comment'];
});

app.intent('hub - date - name - hours - comment - yes', (conv) => {
    const report_data = {
        date: conv.data.report_date,
        name: conv.data.project_name,
        hours: conv.data.hours,
        comment: conv.data.comment
    };
    db.collection("reports").add(report_data);
});

exports.ELAssistantFulfillment = functions.https.onRequest(app);