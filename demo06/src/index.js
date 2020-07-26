import {
    cube
} from './math.js';

if (process.env.NODE_ENV === 'development') {
    console.log('Looks like we are in Development mode!');
}
if (process.env.NODE_ENV === 'production') {
    console.log('Looks like we are in Production mode!');
}

function component() {
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element;
}

document.body.appendChild(component());