import express from "express";
import {
    validatePhone,
    validatePin,
    validateOtp,
    validateRegister,
} from "../middlewares/validateRequest";
import { login, sendOtp, verifyOtpController, register,verifyNumberController } from "../controllers/authController";

const router = express.Router();

router.post("/login", validatePhone, validatePin, login);
router.post("/login/otp", validatePhone, sendOtp);
router.post("/verify/otp", validatePhone, validateOtp, verifyOtpController);
router.post("/register", validateRegister, register);
router.post("/verify-number", validatePhone, verifyNumberController);

export default router;