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
exports.register = exports.verifyOtpController = exports.verifyNumberController = exports.sendOtp = exports.login = void 0;
const authService_1 = require("../services/authService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telephone, pin } = req.body;
    try {
        const user = yield (0, authService_1.findUserByPhone)(telephone);
        if (!user) {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé.", data: null });
            return;
        }
        yield (0, authService_1.verifyPin)(telephone, pin);
        res.status(200).json({ status: true, message: "Connexion réussie.", data: { telephone } });
    }
    catch (error) {
        res.status(400).json({ status: false, message: error.message, data: null });
    }
});
exports.login = login;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telephone } = req.body;
    try {
        const otp = yield (0, authService_1.generateOtp)(telephone);
        console.log(`Simuler l'envoi de l'OTP: ${otp} à ${telephone}`);
        res.status(200).json({ status: true, message: "OTP envoyé.", data: null });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ status: false, message: errorMessage, data: null });
    }
});
exports.sendOtp = sendOtp;
const verifyNumberController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telephone } = req.body;
    try {
        const result = yield (0, authService_1.verifyNumber)(telephone);
        res.status(200).json({
            status: true,
            message: result.message,
            data: { exists: result.exists, telephone },
        });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message, data: null });
    }
});
exports.verifyNumberController = verifyNumberController;
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telephone, code } = req.body;
    try {
        yield (0, authService_1.verifyOtp)(telephone, code);
        res.status(200).json({ status: true, message: "OTP vérifié.", data: { telephone } });
    }
    catch (error) {
        res.status(400).json({ status: false, message: error.message, data: null });
    }
});
exports.verifyOtpController = verifyOtpController;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telephone, nom, prenom, pin } = req.body;
    try {
        const user = yield (0, authService_1.createUser)(telephone, nom, prenom, pin);
        res.status(201).json({ status: true, message: "Utilisateur créé.", data: { user } });
    }
    catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('telephone')) {
            res.status(400).json({
                status: false,
                message: "Le numéro de téléphone est déjà utilisé. Veuillez en choisir un autre.",
                data: null,
            });
        }
        else {
            const errorMessage = error.message || "Erreur interne du serveur";
            res.status(500).json({ status: false, message: errorMessage, data: null });
        }
    }
});
exports.register = register;
