"use strict";
// services/authService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPin = exports.verifyOtp = exports.generateOtp = exports.verifyNumber = exports.createUser = exports.findUserByPhone = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const prisma = new client_1.PrismaClient();
const findUserByPhone = (telephone) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.utilisateur.findUnique({ where: { telephone } });
});
exports.findUserByPhone = findUserByPhone;
const createUser = (telephone, nom, prenom, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPin = yield bcrypt_1.default.hash(pin, 10);
    return yield prisma.utilisateur.create({
        data: { telephone, nom, prenom, pin: hashedPin },
    });
});
exports.createUser = createUser;
const verifyNumber = (telephone) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findUserByPhone)(telephone);
    if (user) {
        return { exists: true, message: "Utilisateur trouvé, veuillez entrer votre PIN." };
    }
    else {
        const otp = yield (0, exports.generateOtp)(telephone);
        console.log(`Simuler l'envoi de l'OTP: ${otp} à ${telephone}`);
        return { exists: false, message: "OTP envoyé, veuillez entrer le code reçu." };
    }
});
exports.verifyNumber = verifyNumber;
const generateOtp = (telephone) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = otp_generator_1.default.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const user = yield prisma.utilisateur.findUnique({ where: { telephone } });
    if (user) {
        yield prisma.utilisateur.update({
            where: { telephone },
            data: { pin: otp, expiresAt: otpExpiration },
        });
    }
    else {
        console.log(`Utilisateur non trouvé. Aucun utilisateur créé.`);
    }
    return otp;
});
exports.generateOtp = generateOtp;
const verifyOtp = (telephone, code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.utilisateur.findUnique({
        where: { telephone },
        select: { pin: true, expiresAt: true },
    });
    if (!user || user.pin !== code) {
        throw new Error("Code OTP invalide");
    }
    if (user.expiresAt < new Date()) {
        throw new Error("Code OTP expiré");
    }
    return true;
});
exports.verifyOtp = verifyOtp;
const verifyPin = (telephone, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.utilisateur.findUnique({ where: { telephone } });
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }
    const isPinValid = yield bcrypt_1.default.compare(pin, user.pin);
    if (!isPinValid) {
        throw new Error("PIN invalide");
    }
    return true;
});
exports.verifyPin = verifyPin;
