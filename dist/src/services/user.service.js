"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const createUser = async (data) => {
    // hash password before saving
    const hashPassword = await bcryptjs_1.default.hash(data.password, 10);
    return await user_model_1.default.create({ ...data, password: hashPassword });
};
exports.createUser = createUser;
const getAllUsers = async () => {
    return await user_model_1.default.find();
};
exports.getAllUsers = getAllUsers;
const authenticateUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const validPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        throw new Error('Invalid password');
    // create token
    if (!config_1.config.jwtSecret) {
        throw new Error('JWT secret is not defined');
    }
    // create JWT
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpiresIn });
    return { token, user };
};
exports.authenticateUser = authenticateUser;
