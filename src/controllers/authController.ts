
import { Request, Response } from "express";
import {
    findUserByPhone,
    createUser,
    generateOtp,
    verifyOtp,
    verifyPin,
    verifyNumber,
} from "../services/authService";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { telephone, pin } = req.body;

    try {
        const user = await findUserByPhone(telephone);
        if (!user) {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé.", data: null });
            return;
        }

        await verifyPin(telephone, pin);
        res.status(200).json({ status: true, message: "Connexion réussie.", data: { telephone } });
    } catch (error) {
        res.status(400).json({ status: false, message: (error as Error).message, data: null });
    }
};

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
    const { telephone } = req.body;

    try {
        const otp = await generateOtp(telephone);
        console.log(`Simuler l'envoi de l'OTP: ${otp} à ${telephone}`);
        res.status(200).json({ status: true, message: "OTP envoyé.", data: null });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ status: false, message: errorMessage, data: null });
    }
};

export const verifyNumberController = async (req: Request, res: Response): Promise<void> => {
    const { telephone } = req.body;

    try {
        const result = await verifyNumber(telephone);
        res.status(200).json({
            status: true,
            message: result.message,
            data: { exists: result.exists, telephone },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: (error as Error).message, data: null });
    }
};

export const verifyOtpController = async (req: Request, res: Response): Promise<void> => {
    const { telephone, code } = req.body;

    try {
        await verifyOtp(telephone, code);
        res.status(200).json({ status: true, message: "OTP vérifié.", data: { telephone } });
    } catch (error) {
        res.status(400).json({ status: false, message: (error as Error).message, data: null });
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    const { telephone, nom, prenom, pin } = req.body;

    try {
        const user = await createUser(telephone, nom, prenom, pin);
        res.status(201).json({ status: true, message: "Utilisateur créé.", data: { user } });
    } catch (error) {
        if ((error as any).code === 'P2002' && (error as any).meta.target.includes('telephone')) {
            res.status(400).json({
                status: false,
                message: "Le numéro de téléphone est déjà utilisé. Veuillez en choisir un autre.",
                data: null,
            });
        } else {
            const errorMessage = (error as Error).message || "Erreur interne du serveur";
            res.status(500).json({ status: false, message: errorMessage, data: null });
        }
    }
};
