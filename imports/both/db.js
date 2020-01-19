import { Mongo } from 'meteor/mongo';

export const SESSIONSDB = new Mongo.Collection('sessions');
export const ROUNDSDB = new Mongo.Collection('rounds');
export const BOWSDB = new Mongo.Collection('bows');
export const TARGETDB = new Mongo.Collection('targets');
