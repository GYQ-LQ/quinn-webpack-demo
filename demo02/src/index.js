import _ from "lodash";
import "./style.css";
import Icon from "./icon.png";
import Data from "./data.xml";

function component() {
    var element = document.createElement("h1");

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(["Hello", "Webpack"], " ");
    element.classList.add("hello");

    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    return element;
}

function font() {
    var element = document.createElement("H2");
    element.innerHTML = _.join(["2020", "07", "23"], " ");
    element.classList.add("font");
    console.log(Data);
    return element;
}

document.body.appendChild(component());
document.body.appendChild(font());