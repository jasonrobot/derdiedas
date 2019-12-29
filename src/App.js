"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var prototype_1 = require("./prototype");
var App = function () {
    return (react_1["default"].createElement("div", { className: "App" }, prototype_1.conjugateWord(prototype_1.frau, prototype_1.Case.Dative)));
};
exports["default"] = App;
