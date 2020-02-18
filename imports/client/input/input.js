import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './input.css';
import './input.html';
import { SESSIONSDB } from '../../both/db';
import '../loading/loading';
import '../addrounds/addrounds';
import '../addsesion/addsesion';
import '../displayscore/displayscore';
import { askSession, formatDate } from '../globals';


Template.input.events({
    'click div#use-session>button': (event) => {
        const answer = event.currentTarget.value;
        if (answer === 'no') {
            Meteor.call('closeAllSessions', (error) => {
                if (error) {
                    console.error(error);
                } else {
                    askSession.set(false);
                }
            });
        } else {
            askSession.set(false);
        }

        event.stopPropagation();
    }
});

Template.input.helpers({
    question() {
        return askSession.get();
    },
    transformDate(someDate) {
        return formatDate(someDate);
    },
    thissession() {
        return SESSIONSDB.findOne({ userid: Meteor.userId(), isopen: true });
    }
});

Template.input.onCreated(function sessionsonCreated() {
    this.subscribe('usersessions');
    // this.subscribe('userbows');
    // this.subscribe('usertargets');
});
