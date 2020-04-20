"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
/**
 * Adicionando Tipagem.
 * => OLTZ tem TypeScript?
 */
function helloWorld(request, response) {
    var user = CreateUser_1.default({
        name: "Caralho",
        email: "De",
        password: "Aza",
        techs: ["Caralho", "De", "Aza", { title: "Bucetinha", experience: 123 }],
    });
    return response.json({ message: "Hello World", user: user });
}
exports.helloWorld = helloWorld;
