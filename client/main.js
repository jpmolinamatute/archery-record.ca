import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './main.html';
import '../imports/client/input/input';
import '../imports/client/output/output';
import '../imports/client/login/login';
import '../imports/client/welcome/welcome';
import '../imports/client/addbow/addbow';
import '../imports/client/controls/controls';
import { templateToDisplay } from '../imports/client/globals';

Template.body.helpers({
    user() {
        return Meteor.userId();
    },
    main() {
        return templateToDisplay.get();
    },
    w() {
        return window.innerWidth;
    },
    h() {
        return window.innerHeight;
    }
});
