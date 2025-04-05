
import { Request, Response, NextFunction } from "express";

export const validatePhone = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.telephone) {
        res.status(400).json({ status: false, message: "Numéro de téléphone requis.", data: null });
        return;
    }
    next();
};

export const validatePin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.pin) {
        res.status(400).json({ status: false, message: "PIN requis.", data: null });
        return;
    }
    next();
};

export const validateOtp = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.code) {
        res.status(400).json({ status: false, message: "Code OTP requis.", data: null });
        return;
    }
    next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { telephone, nom, prenom, pin } = req.body;
    if (!telephone || !nom || !prenom || !pin) {
        res.status(400).json({ status: false, message: "Tous les champs sont requis.", data: null });
        return;
    }
    next();
};