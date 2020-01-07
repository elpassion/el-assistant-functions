# EL Assistant #

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Run](#run)
- [Demo](#demo)
- [Changelog](#changelog)

## Introduction ##

The repository contains a set of functions connected with the **Google Assistant** application called EL **Passion**.
The access to the application is available by adding a Google account as a developer account, and then the application will be ready for use in Google Assistant on both platforms **iOS** and **Android**.

## Technologies ##

- [DialogFlow](https://dialogflow.com/)
- [Google Assistant](https://developers.google.com/assistant)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)
- Javascript/Node.js

## Features ##

**Conversations:**

- **about us**
    - get know about company
    - current opening jobs
    - apply for a job
    - contact via an email or via a phone
- **manage daily basics**
    - add report with the following data:
        - date,
        - project name,
        - number of hours,
        - comment
        - description of work
    - order bananas
    - fire somebody
- **show news**

## Run ##

Firstly, open the Google Assistant app or say the phrase - "Ok, Google". Secondly tell the phrase - "Talk to EL Passion" and then, the EL Passion application will invoke. Be ready to talk and enjoy it!

## Demo ##

(soon)

## Changelog ##

### v3 (07.01 2020) ### 

#### Fixes: ####
* update handling selected option from the list of current job openings

#### Others: ####
* export used agent from DialogFlow

### v2 (29.11 2019) ### 

#### Features: ####

* a conversation to tell who we are as EL Passion,
* a conversation to share current opening jobs,
* a conversation to apply for a job,
* a conversation to contact via an email or via a phone,

#### Capabilities: ####
* require, use `Permission` to ask about user info,
* store user first name and last name,
* save user info in the user storage,
* play sounds during a conversations
* use the following UI elements:
    * `BasicCard`,
    * `Button`,
    * `Image`,
    * `List`,
    * `SimpleResponse`,
    * `Suggestion`

#### Others: ####
* migrate `DialogFlow API` from `v1` to `v2`,
* update a way of storing data in a conversation context,
* rewrite the conversation regarding add a report, order bananas and fire somebody,
* move phrases, dialogues and a logic behind from DialogFlow web-application to Google Cloud Functions,
* create new dialogues in conversations,
* update dialogues in conversations,
* use `Emoji` during a conversations

### v1 (Hackathon Autumn 21.11-22.11 2019) ### 

#### Features: ####
* a conversation to add a report, asking for:
    * date,
    * project name,
    * number of hours,
    * comment or description of work
* a conversation to order bananas,
* a conversation to fire somebody 

#### Capabilities: ####
* collect data,
* pass a data from one intent to another intent, store parameters in the context,
* call a request to database with whole data
