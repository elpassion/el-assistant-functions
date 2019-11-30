# EL Assistant #

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Run](#run)
- [Demo](#demo)
- [Changelog](#changelog)

## Introduction ##

This is a set of functions connected with the application called EL Passion which is available on Google Assistant.

## Technologies ##

* Dialog Flow,
* Google Assistant.
* Google Cloud Function.
* Firebase Cloud Firestore

## Run ##

Open the Google Assistant app or say the phrase - "Ok, Google" and then tell the phrase - "Talk to EL Passion" and next, the application will invoke. Be ready to talk and enjoy!

## Demo ##

(soon)

## Changelog ##

### v2 (29.11 2019) ### 

* a conversation to sharing who we are as EL Passion,
* a conversation to sharing current opening jobs,
* a conversation to applying for a job,
* a conversation to contact via an email or a phone,

#### Capabilities: ####
* use Permission for asking about user info,
* store user first name and last name,
* save user info in the user storage,
* play sounds during a conversations
* use the following UI elements:
    * BasicCard,
    * Button,
    * Image,
    * List,
    * SimpleResponse,
    * Suggestions

#### Others: ####
* migrate DialogFlow API from V1 to V2,
* update a way of storing data in a conversation context,
* rewrite the conversation of adding a report, move phrases, dialogues and the logic behind from DialogFlow web-application to Google Cloud Functions,
* update dialogues in conversations,
* use Emoji

### v1 (Hackathon Autumn 21.11-22.11 2019) ### 

#### Features: ####

* a conversation to adding a report, asking for:
    * date,
    * project name,
    * number of hours,
    * comment or description of work
* a conversation to ordering bananas,
* a conversation to firing someone 

#### Capabilities: ####

* collect data,
* pass a data from one intent to another intent, store parameters in the context,
* call a request to database with whole data
