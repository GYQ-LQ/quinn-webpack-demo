// import _ from "lodash";
// import printMe from "./print.js";

// function component() {
//     var element = document.createElement("h1");
//     var btn = document.createElement("button");
//     element.innerHTML = _.join(["Hello", "Webpack"], " ");

//     btn.innerHTML = "Click printMe!";
//     btn.onclick = printMe;

//     element.appendChild(btn);

//     return element;
// }

// document.body.appendChild(component());

// 动态导入(dynamic imports)

// async function getComponent() {
//     var element = document.createElement("div");
//     const _ = await import ( /* webpackChunkName: "lodash" */ "lodash");

//     element.innerHTML = _.join(["Hello", "webpack"], " ");

//     return element;
// }
// getComponent().then((component) => {
//     document.body.appendChild(component);
// });

import _ from "lodash";

function component() {
    var element = document.createElement("div");
    var button = document.createElement("button");
    var br = document.createElement("br");

    button.innerHTML = "Click me and look at the console!";
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    element.appendChild(br);
    element.appendChild(button);

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = (e) =>
        import ( /* webpackChunkName: "print" */ "./print").then((module) => {
            var print = module.default;

            print();
        });

    return element;
}

document.body.appendChild(component());