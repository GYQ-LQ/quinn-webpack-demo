import _ from "lodash";
import printMe from "./print.js";
import "./style.css";
import Icon from "./icon.png";
import Data from "./data.xml";
import Icon2 from "./img/aliexpress.png";
import Quinn from "./js/quinn";

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
    // 将图像添加到我们现有的 div。
    var myIcon2 = new Image();
    myIcon2.src = Icon2;
    myIcon2.onclick = Quinn;
    element.appendChild(myIcon2);

    return element;
}

function font() {
    var element = document.createElement("H2");
    var btn = document.createElement("button");
    element.innerHTML = _.join(["2020", "07", "23"], " ");
    element.classList.add("font");
    console.log(Data);
    btn.innerHTML = "Click printMe!";
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
let fonts = font();

document.body.appendChild(element);
document.body.appendChild(fonts);

if (module.hot) {
    module.hot.accept("./print.js", function() {
        console.log("Accepting the updated printMe module!");
        printMe();
        document.body.removeChild(font);
        fonts = font(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(fonts);
    });
}