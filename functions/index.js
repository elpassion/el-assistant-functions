'use strict';

const functions = require('firebase-functions');
const firebase = require("firebase");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firestore);
const db = admin.firestore();

const {
    dialogflow,
    Button,
    Image,
    BasicCard,
    List,
    SimpleResponse,
    Suggestions,
    Permission
} = require('actions-on-google');

const app = dialogflow({
    "debug": true,
});

app.intent('Default Welcome Intent', (conv) => {
    conv.ask(`Hello! How can I serve you?`);
    conv.ask(`I can tell about us, manage daily basis at work or show current information or available jobs.`);
    conv.ask(new Suggestions('Tell who you are', 'Manage daily basics', 'Show news'));
});

app.intent('manage_daily_basics', (conv) => {
    const name = conv.user.storage.userName;
    if (!name) {
        conv.ask(new Permission({
            context: 'To get to know you better',
            permissions: 'NAME',
        }));
    } else {
        conv.ask(`What do you want to do?`);
        conv.ask(new Suggestions(`📄 Add report`, '🍌 Order bananas', '🔥 Fire somebody'));
    }
});

app.intent('manage_daily_basics - name_permission', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask(new SimpleResponse({
            speech: `Oh. I need your name.`,
            text: `Oh. I need your name 😔.`,
        }));
        conv.ask(`Please, try again!`);
        conv.ask(new Suggestions('Try again'));
    } else {
        conv.data.userName = conv.user.name.display;
        conv.ask(`Thanks, ${conv.data.userName}.`);
        conv.ask(`What do you want to do?`);
        conv.ask(new Suggestions(`📄 Add report`, '🍌 Order bananas', '🔥 Fire somebody'));
    }
});

app.intent('show_news', (conv) => {
    conv.ask(`What do you want to know?`);
    conv.ask(new Suggestions('💼 Current job openings'));
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
    conv.ask(new Suggestions('💚 Apply for a job'));
});

app.intent('apply_for_a_job', (conv) => {
    conv.ask('Get on board and work with us on a variety of startup projects, learn and enjoy!');
    conv.ask(new List({
        title: 'Current job openings',
        items: {
            'android_developer_job': {
                title: 'Android Developer',
                description: 'Engineering / Mobile',
            },
            'ruby_developer_job': {
                title: 'Ruby Developer',
                description: 'Engineering / Backend',
            },
            'senior_ruby_developer_job': {
                title: 'Senior Ruby Developer',
                description: 'Engineering / Backend',
            },
            'senior_front_end_developer_job': {
                title: 'Senior Front-end Developer',
                description: 'Engineering / Frontend',
            },
            'business_development_representative_job': {
                title: 'Business Development Representative',
                description: 'Support / Sales',
            },
        },
    }));
    conv.ask(new Suggestions('No job fits me', 'Ask a question'));
});

app.intent('apply_for_a_job - contact', (conv) => {
    conv.ask(`Let's ask HR‑Heroes!`);
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

app.intent('fire_somebody - name', (conv) => {
    const context = conv.contexts.get('fire_somebody-followup');
    const audioSound = 'https://actions.google.com/sounds/v1/impacts/crash.ogg\n';
    conv.ask(`<speak>You can say bye to ` +
        `${context.parameters['fire_name']}.` +
        `<audio src="${audioSound}"></audio></speak>`);
});

app.intent('order bananas - amount', (conv) => {
    const context = conv.contexts.get('orderbananas-followup');
    const audioSound = 'https://actions.google.com/sounds/v1/human_voices/human_eating_peach.ogg';
    conv.ask(`<speak>${context.parameters['bananas_number']}` +
        ` Great! ` + `Go to the kitchen and enjoy!` +
        `<audio src="${audioSound}"></audio></speak>`);
});

app.intent('hub', (conv) => {
    conv.ask("OK. Let's add a report.");

});

app.intent('hub - date', (conv) => {
    conv.ask('Give me report date!');
    conv.ask(new Suggestions('Today', 'Yesterday', 'Day before yesterday'));
});

app.intent('hub - date - hours', (conv, params) => {
    const parameters = {
        date: params['report_date']
    };
    conv.contexts.set('hub_date_hours', 5, parameters);
    conv.ask(`How many hours?`);
    conv.ask(new Suggestions('8', '7', '6', '5', '4', '3', '2', '1'));
});

app.intent('hub - date - hours - name', (conv, params) => {
    const parameters = {
        date: conv.contexts.get('hub_date_hours').parameters['date'],
        hours: params['project_hours']
    };
    conv.contexts.set('hub_date_hours_name', 5, parameters);
    conv.ask(`What is the project name?`);
});

app.intent('hub - date - hours - name - comment', (conv, params) => {
    const hours = conv.contexts.get('hub_date_hours_name').parameters['hours'];
    const project_name = params['project_name'];
    const parameters = {
        date: conv.contexts.get('hub_date_hours_name').parameters['date'],
        hours: hours,
        name: project_name
    };
    conv.contexts.set('hub_date_hours_name_comment', 5, parameters);
    conv.ask(`What did you do in ` + project_name + ` for ` + hours + ` hours?`)
});

app.intent('hub - date - hours - name - comment - summary', (conv, params) => {
    const parameters = {
        date: conv.contexts.get('hub_date_hours_name_comment').parameters['date'],
        hours: conv.contexts.get('hub_date_hours_name_comment').parameters['hours'],
        name: conv.contexts.get('hub_date_hours_name_comment').parameters['name'],
        comment: params['project_comment']
    };
    conv.contexts.set('hub_date_hours_name_comment_summary', 5, parameters);
    conv.ask('Great! Send report?');
    conv.ask(new Suggestions('Yes', 'No'));
});

app.intent('hub - date - hours - name - comment - summary - yes', (conv) => {
    const report_data = {
        date: conv.contexts.get('hub_date_hours_name_comment_summary').parameters['date'],
        hours: conv.contexts.get('hub_date_hours_name_comment_summary').parameters['hours'],
        name: conv.contexts.get('hub_date_hours_name_comment_summary').parameters['name'],
        comment: conv.contexts.get('hub_date_hours_name_comment_summary').parameters['comment'],
        userName: conv.data.userName
    };
    db.collection("reports").add(report_data);
    conv.ask('Great job!');
});

exports.ELAssistantFulfillment = functions.https.onRequest(app);