"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCotisation = exports.validateJoinTontine = exports.validateCreateTontine = void 0;
const validateCreateTontine = (req, res, next) => {
    const { nom, montant, frequence, jour, createdBy } = req.body;
    if (!nom || !montant || !frequence || !jour || !createdBy) {
        res.status(400).json({ status: false, message: "Tous les champs sont requis.", data: null });
        return;
    }
    if (typeof montant !== "number" || montant <= 0) {
        res.status(400).json({ status: false, message: "Le montant doit être un nombre positif.", data: null });
        return;
    }
    next();
};
exports.validateCreateTontine = validateCreateTontine;
const validateJoinTontine = (req, res, next) => {
    const { tontineId, utilisateurId } = req.body;
    if (!tontineId || !utilisateurId) {
        res.status(400).json({ status: false, message: "L'ID de la tontine et de l'utilisateur sont requis.", data: null });
        return;
    }
    next();
};
exports.validateJoinTontine = validateJoinTontine;
const validateCotisation = (req, res, next) => {
    const { utilisateurId, tontineId, cycleId, montant } = req.body;
    if (!utilisateurId || !tontineId || !cycleId || !montant) {
        res.status(400).json({ status: false, message: "Tous les champs sont requis.", data: null });
        return;
    }
    if (typeof montant !== "number" || montant <= 0) {
        res.status(400).json({ status: false, message: "Le montant doit être un nombre positif.", data: null });
        return;
    }
    next();
};
exports.validateCotisation = validateCotisation;
