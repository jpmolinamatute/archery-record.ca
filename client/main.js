import { Meteor } from 'meteor/meteor';
import './main.html';
import '../imports/client/input/input';

Template.body.helpers({
    user() {
        return Meteor.userId();
    },
    main() {
        return 'input';
    }
});
