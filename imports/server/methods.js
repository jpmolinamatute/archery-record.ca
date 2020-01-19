import { Meteor } from 'meteor/meteor';
import {
    SESSIONSDB // , ROUNDSDB, BOWSDB, TARGETDB
} from '../both/db';


function closeAllSessions() {
    SESSIONSDB.update({
        userid: this.userId,
        isopen: true
    },
    {
        $set: { isopen: false }
    },
    { multi: true });
}


Meteor.methods({
    closeAllSessions
});
