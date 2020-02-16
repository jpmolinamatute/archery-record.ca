import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './addrounds.css';
import './addrounds.html';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free-solid';
import { ROUNDSDB } from '../../both/db';

const MAX = 11;

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


        let valid = false;
        inputs.forEach((shot) => {
            if (typeof shot.value === 'string' && shot.value.length === 0) {
                save.shots.push(shot.value);
            } else {
                const point = parseInt(shot.value, 10);
                if (!isNaN(point) && point <= MAX) {
                    save.points += point;
                    if (point > 0) {
                        save.valids += 1;
                    } else {
                        save.invalids += 1;
                    }
                    save.shots.push(point);
                    valid = true;
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
        const re = new RegExp('[0-9-]');
        if (currentChar.length === 1 && !re.test(currentChar)) {
            event.preventDefault();
        }
    },
    'keyup div#round-form > div.col > input': (event, templateInstance) => {
        let index = event.currentTarget.dataset.index;
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
    },
    'click div#want-continue > button': (event, templateInstance) => {
        const action = event.currentTarget.value;
        if (action === 'yes') {
            templateInstance.nuround.set(0);
        } else if (action === 'no') {
            Meteor.call('closeAllSessions');
        }
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
        if (session) {
            for (let i = 1; i <= session.nushot; i += 1) {
                dumbList.push({
                    max: MAX,
                    min: -2,
                    i
                });
            }
        }
        return dumbList;
    },
    rounds() {
        const session = Template.instance().data;
        return ROUNDSDB.find({ sessionid: session._id }).count();
    },
    addround() {
        let conti = Template.instance().nuround.get() === 0;
        if (!conti) {
            const session = Template.instance().data;
            const count = ROUNDSDB.find({ sessionid: session._id }).count();
            conti = count < session.nuround;
        }
        return conti;
    }
});

Template.addrounds.onRendered(function addroundsonRendered() {
    const el = this.find('div#round-form > div.col > input[tabindex="1"]');
    if (el) {
        el.focus();
    }
});

Template.addrounds.onCreated(function addroundsonCreated() {
    this.nuround = new ReactiveVar(this.data.nuround);
});
