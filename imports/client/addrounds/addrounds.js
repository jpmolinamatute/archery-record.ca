import { Template } from 'meteor/templating';
import './addrounds.css';
import './addrounds.html';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free-solid';
import { TARGETDB, ROUNDSDB } from '../../both/db';

function saveRound(templateInstance) {
    const inputs = templateInstance.findAll('div#round-form > div.col > input');
    if (Array.isArray(inputs)) {
        const sessionid = templateInstance.data._id;
        const save = {
            userid: Meteor.userId(),
            sessionid,
            datetime: templateInstance.datetime || new Date(),
            valids: 0,
            invalids: 0,
            points: 0,
            shots: []
        };

        const max = TARGETDB.findOne({ _id: templateInstance.data.targetid }, {
            fields: { max: 1, _id: 0 },
            reactive: false
        }).max;
        let valid = true;
        inputs.forEach((shot) => {
            if (typeof shot.value === 'string' && shot.value.length === 0) {
                save.shots.push(shot.value);
            } else {
                const point = parseInt(shot.value, 10);
                if (!isNaN(point) && point <= max) {
                    save.points += point;
                    if (point > 0) {
                        save.valids += 1;
                    } else {
                        save.invalids += 1;
                    }
                    save.shots.push(point);
                } else {
                    valid = false;
                }
            }
        });

        if (valid) {
            ROUNDSDB.insert(save, (error, id) => {
                if (error) {
                    console.error(error);
                } else if (typeof id === 'string') {
                    templateInstance.datetime = undefined;
                    templateInstance.find('div#round-form > div.col > input[tabindex="1"]').focus();
                    inputs.forEach((shot) => {
                        shot.value = '';
                    });
                }
            });
        }
    }
}

Template.addrounds.events({
    'keydown div#round-form > div.col > input': (event) => {
        const currentChar = event.originalEvent.key;
        const re = new RegExp('[A-Za-z]');
        if (currentChar.length === 1 && re.test(currentChar)) {
            event.preventDefault();
        }
    },
    'keyup div#round-form > div.col > input': (event, templateInstance) => {
        let index = event.currentTarget.dataset.index;
        const value = event.currentTarget.value;
        const key = event.originalEvent.key;

        if (key === 'Enter') {
            index = parseInt(index, 10);
            if (index < templateInstance.data.nushot) {
                index += 1;
                templateInstance.find(`div#round-form > div.col > input[tabindex="${index}"]`).focus();
            } else {
                saveRound(templateInstance);
            }
        }
    },
    'click button#add-round': (event, templateInstance) => {
        saveRound(templateInstance);
        event.stopPropagation();
    }
    // 'click button#end-session': (event) => {
    //     Meteor.call('closeAllSessions');
    //     event.stopPropagation();
    // },
    // 'click button#time-round': (event, templateInstance) => {
    //     templateInstance.datetime = new Date();
    //     event.stopPropagation();
    // }
});

Template.addrounds.helpers({
    list() {
        const session = Template.instance().data;
        const dumbList = [];
        if (session && session.targetid) {
            const max = TARGETDB.findOne({ _id: session.targetid }, {
                fields: { max: 1, _id: 0 },
                reactive: false
            }).max;
            for (let i = 1; i <= session.nushot; i += 1) {
                dumbList.push({
                    max,
                    i
                });
            }
        }
        return dumbList;
    },
    buttonorder() {
        const session = Template.instance().data;
        return session.nushot + 1;
    }
});
Template.addrounds.onRendered(function addroundsonRendered() {
    this.find('div#round-form > div.col > input[tabindex="1"]').focus();
});
