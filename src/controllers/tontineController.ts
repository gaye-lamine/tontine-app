import { Request, RequestHandler, Response } from 'express';
import { cotiser, createTontine, joinTontine, validerCycle } from '../services/tontineService';

export const createTontineHandler = async (req: Request, res: Response) => {
  try {
    const { nom, montant, frequence, jour, amende, createdBy } = req.body;

    const tontine = await createTontine({
      nom,
      montant,
      frequence,
      jour,
      amende,
      createdBy,
    });

    res.status(201).json({
      status: true,
      message: 'Tontine créée avec succès',
      data: { tontine, lienInvitation: `https://tonapp.com/join/${tontine.id}` },
    });
  } catch (error) {
    res.status(500).json({ 
      status: false, 
      message: error instanceof Error ? error.message : 'Une erreur est survenue', 
      data: null 
    });
  }
};

export const joinTontineHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tontineId, utilisateurId } = req.body;

    if (!tontineId || !utilisateurId) {
      res.status(400).json({
        status: false,
        message: "L'ID de la tontine et de l'utilisateur sont requis.",
        data: null,
      });
      return;
    }

    const participant = await joinTontine({ tontineId, utilisateurId });

    res.status(201).json({
      status: true,
      message: 'Vous avez rejoint la tontine avec succès',
      data: { participant },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Une erreur est survenue',
      data: null,
    });
  }
};

export const cotiserHandler = async (req: Request, res: Response) => {
  try {
    const { utilisateurId, tontineId, cycleId, montant } = req.body;

    const cotisation = await cotiser({ utilisateurId, tontineId, cycleId, montant });

    await validerCycle(tontineId, cycleId);

    res.status(201).json({
      status: true,
      message: 'Cotisation effectuée avec succès',
      data: { cotisation },
    });
  } catch (error) {
    res.status(500).json({ 
      status: false, 
      message: error instanceof Error ? error.message : 'Une erreur est survenue', 
      data: null 
    });
  }
};
