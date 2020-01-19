import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './displayscore.css';
import './displayscore.html';
import { ROUNDSDB } from '../../both/db';

Template.displayscore.events({

});

Template.displayscore.helpers({
    display() {
        const sessionid = Template.instance().data.sessionid;
        const track = {
            roundnum: 0,
            valid: 0,
            invalid: 0,
            total: 0,
            points: 0
        };
        ROUNDSDB.find({ sessionid }).forEach((doc) => {
            track.roundnum += 1;
            track.points += doc.points;
            track.invalid += doc.invalids;
            track.valid += doc.valids;
            track.total += (doc.invalids + doc.valids);
        });
        return track;
    }
});
Template.displayscore.onCreated(function displayscoreonCreated() {
    this.subscribe('userrounds', this.data.sessionid);
});
