import { Request, Response, NextFunction } from "express";

export const validateCreateCycle = (req: Request, res: Response, next: NextFunction) => {
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
