import { Template } from 'meteor/templating';
import './addrounds.css';
import './addrounds.html';
import { TARGETDB, ROUNDSDB } from '../../both/db';

Template.addrounds.events({
    'click button#add-round': (event, templateInstance) => {
        const shots = templateInstance.findAll('input');
        if (Array.isArray(shots)) {
            const rings = TARGETDB.findOne({ _id: templateInstance.data.targetid }).rings;
            const save = {
                userid: Meteor.userId(),
                sessionid: templateInstance.data._id,
                datetime: templateInstance.datetime || new Date(),
                valids: 0,
                invalids: 0,
                points: 0,
                shots: []
            };

            shots.forEach((shot) => {
                const shotNum = parseInt(shot.value, 10) > 0 ? parseInt(shot.value, 10) : 0;
                if (shotNum > 0) {
                    const ring = rings.find((item) => item._id === shot.dataset.id);
                    save.points = ring.point * shotNum;
                    if (ring.point > 0) {
                        save.valids += shotNum;
                    } else {
                        save.invalids += shotNum;
                    }
                }
                save.shots.push({
                    ringid: shot.dataset.id,
                    quantity: shotNum
                });
            });
            ROUNDSDB.insert(save, (error, id) => {
                if (error) {
                    console.error(error);
                } else if (typeof id === 'string') {
                    templateInstance.datetime = undefined;
                    shots.forEach((shot) => {
                        shot.value = '';
                    });
                }
            });
        }
        event.stopPropagation();
    },
    'click button#end-session': (event) => {
        Meteor.call('closeAllSessions');
        event.stopPropagation();
    },
    'click button#time-round': (event, templateInstance) => {
        templateInstance.datetime = new Date();
        event.stopPropagation();
    }
});

Template.addrounds.helpers({
    rings() {
        let rings = false;
        const session = Template.instance().data;
        if (session && session.targetid) {
            rings = TARGETDB.findOne({ _id: session.targetid }).rings;
        }
        return rings;
    }
});
Template.addrounds.onCreated(function addroundsonCreated() {
    this.subscribe('usertargets');
});
