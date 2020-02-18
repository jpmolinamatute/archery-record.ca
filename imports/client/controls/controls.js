import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { templateToDisplay, formatDate, outputSession } from '../globals';
import { SESSIONSDB } from '../../both/db';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free-solid';
import './controls.css';
import './controls.html';


Template.controls.events({
    'click button#change-template': (event) => {
        templateToDisplay.set(event.currentTarget.dataset.show);
        event.stopPropagation();
    },
    'click button#close-session': (event) => {
        Meteor.call('closeAllSessions');
        event.stopPropagation();
    },
    'change select#session-list': (event) => {
        outputSession.set(event.currentTarget.value);
    }
});

Template.controls.helpers({
    isTemplate(templateName) {
        check(templateName, String);
        return templateToDisplay.get() === templateName;
    },
    hassessionopen() {
        const session = SESSIONSDB.findOne({ userid: Meteor.userId(), isopen: true });
        return typeof session === 'object';
    },
    sessionList() {
        return SESSIONSDB.find({ userid: Meteor.userId() }, { fields: { created_on: 1 } }).map((doc) => {
            doc.dateFormatted = formatDate(doc.created_on);
            return doc;
        });
    }
});

Template.controls.onCreated(function controlsonCreated() {
    this.subscribe('usersessions');
});
