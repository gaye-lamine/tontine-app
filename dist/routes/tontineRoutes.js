"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tontineController_1 = require("../controllers/tontineController");
const validateTontineRequest_1 = require("../middlewares/validateTontineRequest");
const router = express_1.default.Router();
router.post("/create", validateTontineRequest_1.validateCreateTontine, tontineController_1.createTontineHandler);
router.post("/join/:tontineId", validateTontineRequest_1.validateJoinTontine, tontineController_1.joinTontineHandler);
router.post("/cotiser", validateTontineRequest_1.validateCotisation, tontineController_1.cotiserHandler);
exports.default = router;
