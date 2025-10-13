"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = async (data) => {
    return await product_model_1.default.create(data);
};
exports.createProduct = createProduct;
const getAllProducts = async () => {
    return await product_model_1.default.find();
};
exports.getAllProducts = getAllProducts;
