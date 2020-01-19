import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import {
    SESSIONSDB, ROUNDSDB, BOWSDB, TARGETDB
} from '../both/db';


SESSIONSDB.allow({
    insert(userid, doc) {
        return typeof userid === 'string' && doc.userid === userid;
    }
});

BOWSDB.allow({
    insert(userid, doc) {
        return typeof userid === 'string' && doc.userid === userid;
    }
});

TARGETDB.allow({
    insert(userid, doc) {
        return typeof userid === 'string' && doc.userid === userid;
    }
});

ROUNDSDB.allow({
    insert(userid, doc) {
        return typeof userid === 'string' && doc.userid === userid;
    }
});

Meteor.publish('usersessions', function usersessions() {
    if (!this.userId) {
        return this.ready();
    }
    return SESSIONSDB.find({ userid: this.userId }, { sort: { created_on: 1 } });
});

Meteor.publish('userrounds', function userrounds(sessionid) {
    if (!this.userId) {
        return this.ready();
    }
    check(sessionid, String);

    return ROUNDSDB.find({ userid: this.userId, sessionid }, { sort: { datetime: 1 } });
});

Meteor.publish('usertargets', function usertargets() {
    if (!this.userId) {
        return this.ready();
    }

    return TARGETDB.find({ userid: this.userId }, { sort: { name: 1 } });
});

Meteor.publish('userbows', function userbows() {
    if (!this.userId) {
        return this.ready();
    }
    return BOWSDB.find({ userid: this.userId }, { sort: { name: 1 } });
});
