import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './output.css';
import './output.html';
import { SESSIONSDB, ROUNDSDB } from '../../both/db';

Template.output.events({

});

Template.output.helpers({
    nushot() {
        let num = 0;
        const session = Template.instance().session.get();
        if (typeof session === 'object') {
            num = session.nushot;
        }

        return num;
    },
    hasSession() {
        return Template.instance().session.get();
    },
    filterRound(round) {
        return round + 1;
    },
    filterShots(shot) {
        let newShot = shot;
        if (shot === 0) {
            newShot = 'M';
        } else if (typeof shot === 'string' && shot.length === 0) {
            newShot = '-';
        }
        return newShot;
    },
    accumulative(total) {
        Template.instance().accumulative += total;
        return Template.instance().accumulative;
    },
    rounds() {
        const session = Template.instance().session.get();
        if (typeof session === 'object') {
            const sessionid = session._id;
            return ROUNDSDB.find({ userid: Meteor.userId(), sessionid });
        }
        return false;
    }
});

Template.output.onCreated(function outputonCreated() {
    this.session = new ReactiveVar(false);
    this.accumulative = 0;
    this.subscribe('usersessions', (error) => {
        if (error) {
            console.error(error);
        } else {
            const session = SESSIONSDB.findOne({ userid: Meteor.userId(), isopen: true });
            if (typeof session === 'object') {
                this.session.set(session);
            }
        }
    });
    this.autorun(() => {
        const session = this.session.get();
        if (typeof session === 'object') {
            this.subscribe('userrounds', session._id);
        }
    });
});
