import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './addsesion.css';
import './addsesion.html';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free-solid';
import { TARGETDB, BOWSDB, SESSIONSDB } from '../../both/db';
import { askSession } from '../globals';

Template.addsesion.events({
    'click button#asession-save': (event, templateInstance) => {
        const rangeName = templateInstance.find('input#asession-range_name');
        const distance = templateInstance.find('input#asession-distance');
        // const targetid = templateInstance.find('select#asession-targetid');
        // const bowid = templateInstance.find('select#asession-bowid');
        const nushot = templateInstance.find('input#asession-shots');
        const rounds = templateInstance.find('input#asession-rounds');

        // const bowvalue = typeof bowid.value === 'string' && bowid.value.length > 0 ? bowid.value : false;
        // const targetvalue = typeof targetid.value === 'string' && targetid.value.length > 0 ? targetid.value : false;
        const rangevalue = typeof rangeName.value === 'string' && rangeName.value.length > 0 ? rangeName.value : false;
        const distancevalue = parseInt(distance.value, 10) > 1 && parseInt(nushot.value, 10) <= 70 ? parseInt(distance.value, 10) : false;
        const nushotvalue = parseInt(nushot.value, 10) >= 1 && parseInt(nushot.value, 10) <= 8 ? parseInt(nushot.value, 10) : false;
        const roundsvalue = parseInt(rounds.value, 10) >= 1 ? parseInt(rounds.value, 10) : false;

        if (rangevalue && distancevalue && nushotvalue && roundsvalue) {
            SESSIONSDB.insert({
                distance: distancevalue,
                isopen: true,
                nushot: nushotvalue,
                nuround: roundsvalue,
                range_name: rangevalue,
                userid: Meteor.userId(),
                created_on: new Date()
            }, (error, id) => {
                if (error) {
                    console.error(error);
                } else if (typeof id === 'string') {
                    askSession.set(false);
                    rangeName.value = '';
                    distance.value = '';
                    rounds.value = '';
                    nushot.value = '';
                }
            });
        }
        event.stopPropagation();
    }
});


Template.addsesion.helpers({
    bows() {
        return BOWSDB.find({ userid: Meteor.userId() });
    },
    targets() {
        return TARGETDB.find({ userid: Meteor.userId() });
    }
});
