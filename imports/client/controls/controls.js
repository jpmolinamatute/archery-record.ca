import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { templateToDisplay } from '../globals';
import { SESSIONSDB, ROUNDSDB } from '../../both/db';
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
    }
});

Template.controls.helpers({
    isTemplate(templateName) {
        check(templateName, String);
        return templateToDisplay.get() === templateName;
    },
    sessionid() {
        const session = SESSIONSDB.findOne({ userid: Meteor.userId(), isopen: true });
        return typeof session === 'object' ? session._id : false;
    },
    hasRound(sessionid) {
        return ROUNDSDB.find({ sessionid }).count() > 0;
    }
});
