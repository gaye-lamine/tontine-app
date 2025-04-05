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
exports.cotiserHandler = exports.joinTontineHandler = exports.createTontineHandler = void 0;
const tontineService_1 = require("../services/tontineService");
const createTontineHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, montant, frequence, jour, amende, createdBy } = req.body;
        const tontine = yield (0, tontineService_1.createTontine)({
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
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error instanceof Error ? error.message : 'Une erreur est survenue',
            data: null
        });
    }
});
exports.createTontineHandler = createTontineHandler;
const joinTontineHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const participant = yield (0, tontineService_1.joinTontine)({ tontineId, utilisateurId });
        res.status(201).json({
            status: true,
            message: 'Vous avez rejoint la tontine avec succès',
            data: { participant },
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error instanceof Error ? error.message : 'Une erreur est survenue',
            data: null,
        });
    }
});
exports.joinTontineHandler = joinTontineHandler;
const cotiserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { utilisateurId, tontineId, cycleId, montant } = req.body;
        const cotisation = yield (0, tontineService_1.cotiser)({ utilisateurId, tontineId, cycleId, montant });
        yield (0, tontineService_1.validerCycle)(tontineId, cycleId);
        res.status(201).json({
            status: true,
            message: 'Cotisation effectuée avec succès',
            data: { cotisation },
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error instanceof Error ? error.message : 'Une erreur est survenue',
            data: null
        });
    }
});
exports.cotiserHandler = cotiserHandler;
