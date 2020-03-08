import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './welcome.css';
import './welcome.html';
import { templateToDisplay } from '../globals';

Template.welcome.events({
    'click div#welcome-control > button': (event) => {
        const value = event.currentTarget.value;
        console.log(value);

        templateToDisplay.set(value);
        event.stopPropagation();
    }
});

Template.welcome.helpers({

});

// Template.welcome.onCreated(function welcomeonCreated(){

// });
