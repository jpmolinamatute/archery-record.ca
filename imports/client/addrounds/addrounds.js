import { Template } from 'meteor/templating';
import './addrounds.css';
import './addrounds.html';
import '../shot/shot';
import { TARGETDB, ROUNDSDB } from '../../both/db';

Template.addrounds.events({
    'click button#add-round': (event, templateInstance) => {
        const selects = templateInstance.findAll('select');
        if (Array.isArray(selects)) {
            const save = {
                userid: Meteor.userId(),
                sessionid: templateInstance.data._id,
                datetime: templateInstance.datetime || new Date(),
                valids: 0,
                invalids: 0,
                points: 0,
                shots: []
            };

            selects.forEach((shot) => {
                const point = parseInt(shot.value, 10);
                if (!isNaN(point)) {
                    save.points += point;
                    if (point > 0) {
                        save.valids += 1;
                    } else {
                        save.invalids += 1;
                    }
                }
                save.shots.push(point);
            });
            ROUNDSDB.insert(save, (error, id) => {
                if (error) {
                    console.error(error);
                } else if (typeof id === 'string') {
                    templateInstance.datetime = undefined;
                    selects.forEach((shot) => {
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
    list() {
        const session = Template.instance().data;
        const dumbList = [];
        if (session && session.targetid) {
            const rings = TARGETDB.findOne({ _id: session.targetid }, {
                fields: { 'rings.point': 1, _id: 0 },
                reactive: false
            }).rings;
            for (let i = 1; i <= session.nushot; i += 2) {
                const shot1 = i;
                const shot2 = i + 1 <= session.nushot ? i + 1 : false;
                dumbList.push({
                    shot1,
                    shot2,
                    rings
                });
            }
        }
        return dumbList;
    }
});
