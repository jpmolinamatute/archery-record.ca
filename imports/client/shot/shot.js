import { Template } from 'meteor/templating';
import './shot.css';
import './shot.html';


Template.shot.helpers({
    data() {
        return Template.instance().data;
    }
});
