"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCycle = void 0;
const validateCreateCycle = (req, res, next) => {
    const { tontineId, beneficiaireId, ordre } = req.body;
    if (!tontineId || !beneficiaireId || ordre === undefined) {
        res.status(400).json({ status: false, message: "Tous les champs sont requis : tontineId, beneficiaireId, ordre." });
        return;
    }
    if (typeof ordre !== "number" || ordre < 1) {
        res.status(400).json({ status: false, message: "L'ordre doit être un nombre positif." });
        return;
    }
    next();
};
exports.validateCreateCycle = validateCreateCycle;
