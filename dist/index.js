"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const user_1 = __importDefault(require("./user"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express();
app.use(body_parser_1.default.json());
app.use((0, serve_static_1.default)("public"));
app.use((0, cors_1.default)());
const uri = "mongodb://localhost:27017/weConnect";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongo db connection success");
    }
});
app.get("/", (req, resp) => {
    resp.send("Setting Up");
});
app.get("/users", (req, resp) => {
    user_1.default.find((err, users) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(users);
        }
    });
});
//requete post
app.post("/users", (req, resp) => {
    let user = new user_1.default(req.body);
    user.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(user);
    });
});
app.post("/users/:id", (req, resp) => {
    user_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else {
            resp.send("successfully updated user");
        }
    });
});
app.delete("/users/:id", (req, resp) => {
    user_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Successfully deleted user");
    });
});
app.listen(8011, () => {
    console.log("Server Started on port 8011");
});
