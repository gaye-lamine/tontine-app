import { Request, Response } from "express";
import { createCycle, getCyclesByTontine } from "../services/cycleService";

export const createCycleHandler = async (req: Request, res: Response) => {
    try {
        const { tontineId, beneficiaireId, ordre } = req.body;

        const newCycle = await createCycle(tontineId, beneficiaireId, ordre);
        res.status(201).json({ status: true, message: "Cycle créé avec succès.", data: newCycle });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
        res.status(500).json({ status: false, message: "Erreur lors de la création du cycle.", error: errorMessage });
    }
};

export const getCyclesByTontineHandler = async (req: Request, res: Response) => {
    try {
        const { tontineId } = req.params;

        const cycles = await getCyclesByTontine(tontineId);
        res.status(200).json({ status: true, data: cycles });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
        res.status(500).json({ status: false, message: "Erreur lors de la récupération des cycles.", error: errorMessage });
    }
};
