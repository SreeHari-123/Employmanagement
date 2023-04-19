"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employController_1 = require("../controllers/employController");
const router = express_1.default.Router();
router.get('/get', employController_1.getAllEmployees);
router.delete('/employ/:id', employController_1.deleteEmployee);
router.get('/', employController_1.getSingleEmploy);
exports.default = router;
