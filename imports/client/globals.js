import { ReactiveVar } from 'meteor/reactive-var';


export const askSession = new ReactiveVar(true);
export const templateToDisplay = new ReactiveVar('input');

function addZeroToDate(value) {
    return value < 10 ? `0${value}` : value;
}

export function formatDate(someDate) {
    let dateFormatted = false;
    if (someDate instanceof Date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = addZeroToDate(someDate.getDate());
        const hour = addZeroToDate(someDate.getHours());
        const min = addZeroToDate(someDate.getMinutes());
        const sec = addZeroToDate(someDate.getSeconds());
        dateFormatted = `${day}/${months[someDate.getMonth()]}/${someDate.getFullYear()} `;
        dateFormatted += `${hour}:${min}:${sec}`;
    }
    return dateFormatted;
}


export const outputSession = new ReactiveVar(false);
