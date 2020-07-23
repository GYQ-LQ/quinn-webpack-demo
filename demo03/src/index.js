import _ from "lodash";
import printMe from "./print.js";

function component() {
    var element = document.createElement("h1");
    var btn = document.createElement("button");
    element.innerHTML = _.join(["Hello", "Webpack"], " ");

    btn.innerHTML = "Click printMe!";
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());