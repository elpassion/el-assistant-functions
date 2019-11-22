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
    "debug": true
});

const {WebhookClient} = require('dialogflow-fulfillment');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});

    function add_report(agent) {
        const report_ctx4 = agent.getContext("report_ctx4").parameters;
        const report_data = {
            name: report_ctx4.project_name,
            date: report_ctx4.report_date,
            hours: report_ctx4.hours,
            comment: report_ctx4.comment
        };
        return db.collection("reports").add(report_data)
    }

    function add_date(agent) {
        const report_date = agent.parameters.report_date;
        const report_ctx1 = {'name': 'report_ctx1', 'lifespan': 5, 'parameters': {'report_date': report_date}};
        agent.setContext(report_ctx1);
    }

    function add_project_name(agent) {
        const report_ctx1 = agent.getContext("report_ctx1").parameters;
        const report_date = report_ctx1.report_date;
        const project_name = agent.parameters.project_name;
        const report_ctx2 = {
            'name': 'report_ctx2',
            'lifespan': 5,
            'parameters': {'report_date': report_date, 'project_name': project_name}
        };
        agent.setContext(report_ctx2);
    }

    function add_hours(agent) {
        const report_ctx2 = agent.getContext("report_ctx2").parameters;
        const report_date = report_ctx2.report_date;
        const project_name = report_ctx2.project_name;
        const hours = agent.parameters.project_hours;
        const report_ctx3 = {
            'name': 'report_ctx3',
            'lifespan': 5,
            'parameters': {'report_date': report_date, 'project_name': project_name, 'hours': hours}
        };
        agent.setContext(report_ctx3);
    }

    function add_comment(agent) {
        const report_ctx3 = agent.getContext("report_ctx3").parameters;
        const report_date = report_ctx3.report_date;
        const project_name = report_ctx3.project_name;
        const hours = report_ctx3.hours;
        const comment = agent.parameters.project_comment;
        const report_ctx4 = {
            'name': 'report_ctx4',
            'lifespan': 5,
            'parameters': {'report_date': report_date, 'project_name': project_name, 'hours': hours, 'comment': comment}
        };
        agent.setContext(report_ctx4);
    }

    let intentMap = new Map();
    intentMap.set('hub - date', add_date);
    intentMap.set('hub - date - name', add_project_name);
    intentMap.set('hub - date - name - hours', add_hours);
    intentMap.set('hub - date - name - hours - comment', add_comment);
    intentMap.set('hub - date - name - hours - comment - yes', add_report);
    agent.handleRequest(intentMap);
});
