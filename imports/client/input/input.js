import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './input.css';
import './input.html';
import { SESSIONSDB } from '../../both/db';
import '../loading/loading';
import '../addrounds/addrounds';
import '../addsesion/addsesion';
import '../displayscore/displayscore';
import { askSession } from '../globals';


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
        let result = false;
        if (someDate instanceof Date) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            result = `${someDate.getDate()}/${months[someDate.getMonth()]}/${someDate.getFullYear()}`;
        }
        return result;
    },
    thissession() {
        return SESSIONSDB.findOne({ userid: Meteor.userId(), isopen: true });
    }
});

Template.input.onCreated(function sessionsonCreated() {
    this.subscribe('usersessions');
    this.subscribe('userbows');
    this.subscribe('usertargets');
});
