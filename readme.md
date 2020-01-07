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

Firstly, open the Google Assistant app or say the phrase - "Ok, Google". Secondly tell the phrase - "Talk to EL Passion" and then, the EL Passion application will invoke. Be ready to talk and enjoy it!

## Demo ##

(soon)

## Changelog ##

### v2 (29.11 2019) ### 

#### Features: ####

* a conversation to tell who we are as EL Passion,
* a conversation to share current opening jobs,
* a conversation to apply for a job,
* a conversation to contact via an email or a phone,

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
* migrate DialogFlow API from V1 to V2,
* update a way of storing data in a conversation context,
* rewrite the conversation regarding add a report, order bananas and fire somebody,
* move phrases, dialogues and a logic behind from DialogFlow web-application to Google Cloud Functions,
* create new dialogues in conversations,
* update dialogues in conversations,
* use Emoji during a conversations

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
