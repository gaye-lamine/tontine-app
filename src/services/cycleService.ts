import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCycle = async (tontineId: string, beneficiaireId: string, ordre: number) => {
    return await prisma.cycle.create({
        data: {
            tontineId,
            beneficiaireId,
            ordre,
        },
    });
};

export const getCyclesByTontine = async (tontineId: string) => {
    return await prisma.cycle.findMany({
        where: { tontineId },
        include: { beneficiaire: true, cotisations: true, transactions: true },
    });
};
