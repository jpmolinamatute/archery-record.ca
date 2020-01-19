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

Template.input.events({
    'click div#use-session>button': (event, templateInstance) => {
        const answer = event.currentTarget.value;
        if (answer === 'no') {
            Meteor.call('closeAllSessions', (error) => {
                if (error) {
                    console.error(error);
                } else {
                    templateInstance.asktouse.set(false);
                }
            });
        } else {
            templateInstance.asktouse.set(false);
        }

        event.stopPropagation();
    }
});

Template.input.helpers({
    notsessions() {
        return SESSIONSDB.find({ userid: Meteor.userId(), isopen: true }).count() === 0;
    },
    question() {
        const input = Template.instance();
        return input.asktouse.get();
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
    this.asktouse = new ReactiveVar(true);
});
