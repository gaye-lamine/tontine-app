"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerNouveauCycle = exports.validerCycle = exports.gererRetardEtFlammes = exports.cotiser = exports.joinTontine = exports.createTontine = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTontine = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const tontine = yield prisma.tontine.create({
        data,
    });
    // Créer le premier cycle
    yield prisma.cycle.create({
        data: {
            tontineId: tontine.id,
            ordre: 1,
            beneficiaireId: tontine.createdBy,
        },
    });
    return tontine;
});
exports.createTontine = createTontine;
const joinTontine = (_a) => __awaiter(void 0, [_a], void 0, function* ({ tontineId, utilisateurId }) {
    const tontine = yield prisma.tontine.findUnique({
        where: { id: tontineId },
    });
    if (!tontine) {
        throw new Error("Tontine introuvable");
    }
    const participant = yield prisma.participant.create({
        data: {
            utilisateurId,
            tontineId,
        },
    });
    return participant;
});
exports.joinTontine = joinTontine;
const cotiser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.cotisation.create({ data });
});
exports.cotiser = cotiser;
const gererRetardEtFlammes = (participantId) => __awaiter(void 0, void 0, void 0, function* () {
    const participant = yield prisma.participant.findUnique({
        where: { id: participantId },
    });
    if (!participant) {
        throw new Error('Participant introuvable');
    }
    const retards = participant.retards + 1;
    const flammes = participant.flammes - 1;
    yield prisma.participant.update({
        where: { id: participantId },
        data: {
            retards,
            flammes,
        },
    });
    yield prisma.participant.update({
        where: { id: participantId },
        data: {
            ordreSouhaite: Number.MAX_SAFE_INTEGER,
        },
    });
    return { retards, flammes };
});
exports.gererRetardEtFlammes = gererRetardEtFlammes;
const validerCycle = (tontineId, cycleId) => __awaiter(void 0, void 0, void 0, function* () {
    const tontine = yield prisma.tontine.findUnique({
        where: { id: tontineId },
        include: { participants: true },
    });
    const nombreParticipants = (tontine === null || tontine === void 0 ? void 0 : tontine.participants.length) || 0;
    const nombreCotisations = yield prisma.cotisation.count({ where: { cycleId } });
    if (nombreCotisations >= nombreParticipants) {
        const cycle = yield prisma.cycle.findUnique({ where: { id: cycleId } });
        if (cycle) {
            console.log(`Envoi des fonds au bénéficiaire : ${cycle.beneficiaireId}`);
            yield (0, exports.creerNouveauCycle)(tontineId, cycle.ordre + 1);
            for (const participant of tontine.participants) {
                if (participant.retards > 0) {
                    yield (0, exports.gererRetardEtFlammes)(participant.id);
                }
            }
            return { success: true, message: "Cycle validé et fonds envoyés." };
        }
    }
    return { success: false, message: "Tous les membres n'ont pas encore cotisé." };
});
exports.validerCycle = validerCycle;
const creerNouveauCycle = (tontineId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const participants = yield prisma.participant.findMany({
        where: { tontineId },
        orderBy: { retards: "asc" },
    });
    if (participants.length === 0) {
        throw new Error("Aucun participant trouvé pour créer un nouveau cycle.");
    }
    return yield prisma.cycle.create({
        data: {
            tontineId,
            ordre: order,
            beneficiaireId: participants[0].utilisateurId,
        },
    });
});
exports.creerNouveauCycle = creerNouveauCycle;
