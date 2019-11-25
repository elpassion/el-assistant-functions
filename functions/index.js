'use strict';

const functions = require('firebase-functions');
const firebase = require("firebase");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firestore);
const db = admin.firestore();

const {
    dialogflow,
    SimpleResponse,
    Suggestions
} = require('actions-on-google');

const app = dialogflow({
    "debug": true,
});

app.intent('Default Welcome Intent', (conv) => {
    conv.ask(`Hello! How can I serve you?`);
    conv.ask(`I can tell about us, manage daily basis at work or show current information or available jobs.`);
    conv.ask(new Suggestions('Tell who you are', 'Manage daily basics', 'Show news'));
});

app.intent('about_us', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `EL Passion is a company that develops Ruby on Rails web applications, ` +
            `feature-rich iOS and Android applications for clients worldwide.`,
        text: `EL Passion is a company that develops Ruby on Rails web applications, ` +
            `feature-rich iOS and Android applications for clients worldwide.`,
    }));
    conv.ask(new SimpleResponse({
        speech: `We are innovative, creative and love to push the boundaries of what is possible.`,
        text: `We are innovative, creative and love to push the boundaries of what is possible.`,
    }));
    conv.ask(new Suggestions("💼 I'm looking for a job"));
});

app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask(`Ok, no worries. How can I serve you?`);
    } else {
        conv.data.userName = conv.user.name.display;
        conv.ask(`Thanks, ${conv.data.userName}. How can I serve you?`);
    }
});

app.intent('about_us', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `EL Passion is a company that develops Ruby on Rails web applications, ` +
            `feature-rich iOS and Android applications for clients worldwide.`,
        text: `EL Passion is a company that develops Ruby on Rails web applications, ` +
            `feature-rich iOS and Android applications for clients worldwide.`,
    }));
    conv.ask(new SimpleResponse({
        speech: `We are innovative, creative and love to push the boundaries of what is possible.`,
        text: `We are innovative, creative and love to push the boundaries of what is possible.`,
    }));
    conv.ask(new Suggestions('Apply for a job'));
});

app.intent('fire_somebody - name', (conv) => {
    const context = conv.contexts.get('fire_somebody-followup');
    const audioSound = 'https://actions.google.com/sounds/v1/impacts/crash.ogg\n';
    conv.close(`<speak>You can say bye to ` +
        `${context.parameters['fire_name']}.` +
        `<audio src="${audioSound}"></audio></speak>`);
});

app.intent('order bananas - amount', (conv) => {
    const context = conv.contexts.get('orderbananas-followup');
    const audioSound = 'https://actions.google.com/sounds/v1/human_voices/human_eating_peach.ogg';
    conv.close(`<speak>${context.parameters['bananas_number']}` +
        ` NICE! ` + `Go to the kitchen and enjoy!` +
        `<audio src="${audioSound}"></audio></speak>`);
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