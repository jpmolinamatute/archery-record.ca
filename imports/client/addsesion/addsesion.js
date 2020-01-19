import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './addsesion.css';
import './addsesion.html';
import { TARGETDB, BOWSDB, SESSIONSDB } from '../../both/db';

Template.addsesion.events({
    'click button#asession-save': (event, templateInstance) => {
        const rangeName = templateInstance.find('input#asession-range_name');
        const distance = templateInstance.find('input#asession-distance');
        const targetid = templateInstance.find('select#asession-targetid');
        const bowid = templateInstance.find('select#asession-bowid');

        const bowvalue = typeof bowid.value === 'string' && bowid.value.length > 0 ? bowid.value : false;
        const targetvalue = typeof targetid.value === 'string' && targetid.value.length > 0 ? targetid.value : false;
        const rangevalue = typeof rangeName.value === 'string' && rangeName.value.length > 0 ? rangeName.value : false;
        const distancevalue = parseInt(distance.value, 10) > 0 ? parseInt(distance.value, 10) : false;

        if (bowvalue && targetvalue && rangevalue && distancevalue) {
            SESSIONSDB.insert({
                distance: distancevalue,
                isopen: true,
                range_name: rangevalue,
                userid: Meteor.userId(),
                targetid: targetvalue,
                bowid: bowvalue,
                created_on: new Date()
            }, (error, id) => {
                if (error) {
                    console.error(error);
                } else if (typeof id === 'string') {
                    rangeName.value = '';
                    distance.value = '';
                    targetid.value = '';
                    bowid.value = '';
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


Template.addsesion.onCreated(function addsesiononCreated() {
    this.subscribe('userbows');
    this.subscribe('usertargets');
});
