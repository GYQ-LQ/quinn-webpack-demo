import _ from "lodash";

function component() {
    var element = document.createElement("h1");

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(["Hello", "Webpack"], " ");

    return element;
}

document.body.appendChild(component());