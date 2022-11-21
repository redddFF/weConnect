"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let userSchema = new mongoose_1.default.Schema({
    _Id: Number,
    Nom: String,
    Prenom: String,
    Email: String,
    Password: String,
    Status: String,
    Birth: Date,
    Gender: String
}, {
    timestamps: true
});
userSchema.plugin(mongoose_paginate_1.default);
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
