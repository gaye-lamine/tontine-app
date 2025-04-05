import { Request, Response, NextFunction } from "express";

export const validateCreateTontine = (req: Request, res: Response, next: NextFunction): void => {
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

export const validateJoinTontine = (req: Request, res: Response, next: NextFunction): void => {
    const { tontineId, utilisateurId } = req.body;

    if (!tontineId || !utilisateurId) {
        res.status(400).json({ status: false, message: "L'ID de la tontine et de l'utilisateur sont requis.", data: null });
        return;
    }

    next();
};

export const validateCotisation = (req: Request, res: Response, next: NextFunction): void => {
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
