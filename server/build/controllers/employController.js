"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleEmploy = exports.deleteEmployee = exports.getAllEmployees = void 0;
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("employyy").items.getAll();
        return res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const getSingleEmploy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("employyy").items.getById(7)();
        return res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleEmploy = getSingleEmploy;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield sp_commonjs_1.sp.web.lists.getByTitle("employyy").items.getById(7).delete();
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteEmployee = deleteEmployee;
