import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './output.css';
import './output.html';
import { ROUNDSDB, SESSIONSDB } from '../../both/db';
import { outputSession } from '../globals';


Template.output.events({

});

Template.output.helpers({
    nushot() {
        let num = 0;
        const sessionid = outputSession.get();
        if (typeof sessionid === 'string') {
            const numTemp = SESSIONSDB.findOne({ _id: sessionid }, { fileds: { nushot: 1, _id: 0 }, reactive: false });
            if (typeof numTemp === 'object') {
                num = numTemp.nushot;
            }
        }

        return num;
    },
    hasSession() {
        return outputSession.get();
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
        const sessionid = outputSession.get();
        if (typeof sessionid === 'string') {
            return ROUNDSDB.find({ userid: Meteor.userId(), sessionid });
        }
        return false;
    }
});

Template.output.onCreated(function outputonCreated() {
    this.accumulative = 0;
    this.autorun(() => {
        const sessionid = outputSession.get();
        if (typeof sessionid === 'string') {
            this.subscribe('userrounds', sessionid);
        }
    });
});
