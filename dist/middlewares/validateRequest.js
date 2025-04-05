"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateOtp = exports.validatePin = exports.validatePhone = void 0;
const validatePhone = (req, res, next) => {
    if (!req.body.telephone) {
        res.status(400).json({ status: false, message: "Numéro de téléphone requis.", data: null });
        return;
    }
    next();
};
exports.validatePhone = validatePhone;
const validatePin = (req, res, next) => {
    if (!req.body.pin) {
        res.status(400).json({ status: false, message: "PIN requis.", data: null });
        return;
    }
    next();
};
exports.validatePin = validatePin;
const validateOtp = (req, res, next) => {
    if (!req.body.code) {
        res.status(400).json({ status: false, message: "Code OTP requis.", data: null });
        return;
    }
    next();
};
exports.validateOtp = validateOtp;
const validateRegister = (req, res, next) => {
    const { telephone, nom, prenom, pin } = req.body;
    if (!telephone || !nom || !prenom || !pin) {
        res.status(400).json({ status: false, message: "Tous les champs sont requis.", data: null });
        return;
    }
    next();
};
exports.validateRegister = validateRegister;
