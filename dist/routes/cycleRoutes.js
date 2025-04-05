"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cycleController_1 = require("../controllers/cycleController");
const validateCycleRequest_1 = require("../middlewares/validateCycleRequest");
const router = express_1.default.Router();
router.post("/create", validateCycleRequest_1.validateCreateCycle, cycleController_1.createCycleHandler);
router.get("/:tontineId", cycleController_1.getCyclesByTontineHandler);
exports.default = router;
