import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './login.css';
import './login.html';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free-solid';

Template.login.events({
    'click button#login': (event) => {
        Meteor.loginWithGoogle({
            requestPermissions: ['openid', 'profile', 'email']
        }, (error) => {
            if (error) {
                console.error(error); // If there is any error, will get error here
            } else {
                console.log(Meteor.user());// If there is successful login, you will get login details here
            }
        });
        event.stopPropagation();
    },
    'click button#logout': (event) => {
        Meteor.logout();
        event.stopPropagation();
    }
});

Template.login.helpers({
    user() {
        return Meteor.user();
    }
});
Template.login.onCreated(function loginonCreated() {
    this.subscribe('userData');
});
