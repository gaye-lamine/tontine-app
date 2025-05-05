// services/authService.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

const prisma = new PrismaClient();

export const findUserByPhone = async (telephone: string) => {
    return await prisma.utilisateur.findUnique({ where: { telephone } });
};

export const createUser = async (telephone: string, nom: string, prenom: string, pin: string) => {
    const hashedPin = await bcrypt.hash(pin, 10);
    return await prisma.utilisateur.create({
        data: { telephone, nom, prenom, pin: hashedPin },
    });
};
export const verifyNumber = async (telephone: string) => {
    const user = await findUserByPhone(telephone);

    if (user) {
        return { exists: true, message: "Utilisateur trouvé, veuillez entrer votre PIN." };
    } else {
        const otp = await generateOtp(telephone);
        console.log(`Simuler l'envoi de l'OTP: ${otp} à ${telephone}`);
        return { exists: false, message: "OTP envoyé, veuillez entrer le code reçu." };
    }
};

export const generateOtp = async (telephone: string) => {
    const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    const user = await prisma.utilisateur.findUnique({ where: { telephone } });
    
    if (user) {
        await prisma.utilisateur.update({
            where: { telephone },
            data: { pin: otp, expiresAt: otpExpiration },
        });
    } else {
        console.log(`Utilisateur non trouvé. Aucun utilisateur créé.`);
    }

    return otp;
};


export const verifyOtp = async (telephone: string, code: string) => {
    const user = await prisma.utilisateur.findUnique({
        where: { telephone },
        select: { pin: true, expiresAt: true },
    });

    if (!user || user.pin !== code) {
        throw new Error("Code OTP invalide");
    }

    if (user.expiresAt < new Date()) {
        throw new Error("Code OTP expiré");
    }

    return true;
};

export const verifyPin = async (telephone: string, pin: string) => {
    const user = await prisma.utilisateur.findUnique({ where: { telephone } });
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
        throw new Error("PIN invalide");
    }

    return true;
};