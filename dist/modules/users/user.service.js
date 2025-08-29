"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = getById;
exports.updateById = updateById;
exports.searchBySkill = searchBySkill;
exports.searchByName = searchByName;
const user_model_1 = __importDefault(require("./user.model"));
function getById(id) {
    return user_model_1.default.findById(id);
}
function updateById(id, data) {
    return user_model_1.default.findByIdAndUpdate(id, data, { new: true });
}
function searchBySkill(skill) {
    if (!skill)
        return user_model_1.default.find().limit(50);
    const re = new RegExp(skill, 'i');
    return user_model_1.default.find({ $or: [{ skillsTeach: re }, { skillsLearn: re }] }).limit(50);
}
function searchByName(name) {
    if (!name)
        return user_model_1.default.find().limit(50);
    const re = new RegExp(name, 'i');
    return user_model_1.default.find({ name: re }).limit(50);
}
