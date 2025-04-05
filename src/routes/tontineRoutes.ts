import express from "express";
import {
    createTontineHandler,
    joinTontineHandler,
    cotiserHandler
} from "../controllers/tontineController";
import {
    validateCreateTontine,
    validateJoinTontine,
    validateCotisation
} from "../middlewares/validateTontineRequest";

const router = express.Router();

router.post("/create", validateCreateTontine, createTontineHandler);
router.post("/join/:tontineId", validateJoinTontine, joinTontineHandler);
router.post("/cotiser", validateCotisation, cotiserHandler);

export default router;
