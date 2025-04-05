"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../middlewares/validateRequest");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/login", validateRequest_1.validatePhone, validateRequest_1.validatePin, authController_1.login);
router.post("/login/otp", validateRequest_1.validatePhone, authController_1.sendOtp);
router.post("/verify/otp", validateRequest_1.validatePhone, validateRequest_1.validateOtp, authController_1.verifyOtpController);
router.post("/register", validateRequest_1.validateRegister, authController_1.register);
router.post("/verify-number", validateRequest_1.validatePhone, authController_1.verifyNumberController);
exports.default = router;
