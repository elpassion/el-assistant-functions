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

app.intent('apply_for_a_job', (conv) => {
    conv.ask('Get on board and work with us on a variety of startup projects, learn and enjoy!');
    conv.ask(new List({
        title: 'Current Job Openings',
        items: {
            'android_developer_job': {
                synonyms: [
                    'Android Developer',
                ],
                title: 'Android Developer',
                description: 'Engineering / Mobile',
            },
            'ruby_developer_job': {
                synonyms: [
                    'Ruby Developer',
                ],
                title: 'Ruby Developer',
                description: 'Engineering / Backend',
            },
            'senior_ruby_developer_job': {
                synonyms: [
                    'Senior Ruby Developer',
                ],
                title: 'Senior Ruby Developer',
                description: 'Engineering / Backend',
            },
            'senior_front_end_developer_job': {
                synonyms: [
                    'Senior Frontend Developer',
                ],
                title: 'Senior Front-end Developer',
                description: 'Engineering / Frontend',
            },
            'business_development_representative_job': {
                synonyms: [
                    'Business Development Representative',
                ],
                title: 'Business Development Representative',
                description: 'Support / Sales',
            },
        },
    }));
    conv.ask(new Suggestions('No job fits me', 'I have a question'));
});

app.intent('apply_for_a_job - contact', (conv) => {
    conv.ask(`Ask HR‑Heroes!`);
    conv.ask(new Suggestions('📞 Call', '📧 E-mail'));
});

app.intent('apply_for_a_job - contact - call', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `Call to us!`,
        text: `📞 Call to us!`,
    }));
    conv.ask('+48 792 541 588');
});

app.intent('apply_for_a_job - contact - email', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `Write an email to us!`,
        text: `📧 Write an email to us!`,
    }));
    conv.ask('careers@elpassion.pl');
});

app.intent('apply_for_a_job - android_developer_job', (conv) => {
    conv.ask(`Here's a job offer for Android Developer.`);
    conv.ask(new BasicCard({
        subtitle: 'Engineering / Mobile',
        title: 'Android Developer',
        buttons: new Button({
            title: 'Apply for this job',
            url: 'https://apply.workable.com/elpassion/j/E4F2976D09/',
        }),
        image: new Image({
            url: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/13617/nowe_logo_blisko.png',
            alt: 'EL Passion',
        }),
        display: 'CROPPED',
    }));
});

app.intent('apply_for_a_job - ruby_developer_job', (conv) => {
    conv.ask(`Here's a job offer for Ruby Developer.`);
    conv.ask(new BasicCard({
        subtitle: 'Engineering / Backend',
        title: 'Ruby Developer',
        buttons: new Button({
            title: 'Apply for this job',
            url: 'https://apply.workable.com/elpassion/j/48C385051A/',
        }),
        image: new Image({
            url: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/13617/nowe_logo_blisko.png',
            alt: 'EL Passion',
        }),
        display: 'CROPPED',
    }));
});

app.intent('apply_for_a_job - senior_ruby_developer_job', (conv) => {
    conv.ask(`Here's a job offer for Senior Ruby Developer.`);
    conv.ask(new BasicCard({
        subtitle: 'Engineering / Backend',
        title: 'Senior Ruby Developer',
        buttons: new Button({
            title: 'Apply for this job',
            url: 'https://apply.workable.com/elpassion/j/820FBAD549/',
        }),
        image: new Image({
            url: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/13617/nowe_logo_blisko.png',
            alt: 'EL Passion',
        }),
        display: 'CROPPED',
    }));
});

app.intent('apply_for_a_job - senior_frontend_developer_job', (conv) => {
    conv.ask(`Here's a job offer for Senior Frontend Developer.`);
    conv.ask(new BasicCard({
        subtitle: 'Engineering / Frontend',
        title: 'Senior Frontend Developer',
        buttons: new Button({
            title: 'Apply for this job',
            url: 'https://apply.workable.com/elpassion/j/7194D5EABC/',
        }),
        image: new Image({
            url: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/13617/nowe_logo_blisko.png',
            alt: 'EL Passion',
        }),
        display: 'CROPPED',
    }));
});

app.intent('apply_for_a_job - business_development_representative_job', (conv) => {
    conv.ask(`Here's a job offer for Business Development Representative.`);
    conv.ask(new BasicCard({
        subtitle: 'Support / Sales',
        title: 'Business Development Representative',
        buttons: new Button({
            title: 'Apply for this job',
            url: 'https://apply.workable.com/elpassion/j/D28E036290/',
        }),
        image: new Image({
            url: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/13617/nowe_logo_blisko.png',
            alt: 'EL Passion',
        }),
        display: 'CROPPED',
    }));
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