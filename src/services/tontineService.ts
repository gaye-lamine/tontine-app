import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTontine = async (data: {
  nom: string;
  montant: number;
  frequence: string;
  jour?: string;
  amende: number;
  createdBy: string;
}) => {
  const tontine = await prisma.tontine.create({
    data,
  });

  // Créer le premier cycle
  await prisma.cycle.create({
    data: {
      tontineId: tontine.id,
      ordre: 1,
      beneficiaireId: tontine.createdBy,
    },
  });

  return tontine;
};

export const joinTontine = async ({ tontineId, utilisateurId }: { tontineId: string; utilisateurId: string }) => {
  const tontine = await prisma.tontine.findUnique({
    where: { id: tontineId },
  });

  if (!tontine) {
    throw new Error("Tontine introuvable");
  }

  const participant = await prisma.participant.create({
    data: {
      utilisateurId,
      tontineId,
    },
  });

  return participant;
};


export const cotiser = async (data: { utilisateurId: string; tontineId: string; cycleId: string; montant: number }) => {
  return await prisma.cotisation.create({ data });
};

export const gererRetardEtFlammes = async (participantId: string) => {
  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
  });

  if (!participant) {
    throw new Error('Participant introuvable');
  }

  const retards = participant.retards + 1;

  const flammes = participant.flammes - 1;

  await prisma.participant.update({
    where: { id: participantId },
    data: {
      retards,
      flammes,
    },
  });

  await prisma.participant.update({
    where: { id: participantId },
    data: {
      ordreSouhaite: Number.MAX_SAFE_INTEGER,
    },
  });

  return { retards, flammes };
};


export const validerCycle = async (tontineId: string, cycleId: string) => {
  const tontine = await prisma.tontine.findUnique({
    where: { id: tontineId },
    include: { participants: true },
  });

  const nombreParticipants = tontine?.participants.length || 0;
  const nombreCotisations = await prisma.cotisation.count({ where: { cycleId } });

  if (nombreCotisations >= nombreParticipants) {
    const cycle = await prisma.cycle.findUnique({ where: { id: cycleId } });

    if (cycle) {
      console.log(`Envoi des fonds au bénéficiaire : ${cycle.beneficiaireId}`);

      await creerNouveauCycle(tontineId, cycle.ordre + 1);
      for (const participant of tontine!.participants) {
        if (participant.retards > 0) {
          await gererRetardEtFlammes(participant.id);
        }
      }

      return { success: true, message: "Cycle validé et fonds envoyés." };
    }
  }

  return { success: false, message: "Tous les membres n'ont pas encore cotisé." };
};


export const creerNouveauCycle = async (tontineId: string, order: number) => {
  const participants = await prisma.participant.findMany({
    where: { tontineId },
    orderBy: { retards: "asc" },
  });

  if (participants.length === 0) {
    throw new Error("Aucun participant trouvé pour créer un nouveau cycle.");
  }

  return await prisma.cycle.create({
    data: {
      tontineId,
      ordre: order,
      beneficiaireId: participants[0].utilisateurId,
    },
  });
};
