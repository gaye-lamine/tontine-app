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
exports.getCyclesByTontineHandler = exports.createCycleHandler = void 0;
const cycleService_1 = require("../services/cycleService");
const createCycleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tontineId, beneficiaireId, ordre } = req.body;
        const newCycle = yield (0, cycleService_1.createCycle)(tontineId, beneficiaireId, ordre);
        res.status(201).json({ status: true, message: "Cycle créé avec succès.", data: newCycle });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
        res.status(500).json({ status: false, message: "Erreur lors de la création du cycle.", error: errorMessage });
    }
});
exports.createCycleHandler = createCycleHandler;
const getCyclesByTontineHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tontineId } = req.params;
        const cycles = yield (0, cycleService_1.getCyclesByTontine)(tontineId);
        res.status(200).json({ status: true, data: cycles });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
        res.status(500).json({ status: false, message: "Erreur lors de la récupération des cycles.", error: errorMessage });
    }
});
exports.getCyclesByTontineHandler = getCyclesByTontineHandler;
