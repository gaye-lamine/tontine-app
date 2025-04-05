import express from "express";
import { createCycleHandler, getCyclesByTontineHandler } from "../controllers/cycleController";
import { validateCreateCycle } from "../middlewares/validateCycleRequest";

const router = express.Router();

router.post("/create", validateCreateCycle, createCycleHandler);
router.get("/:tontineId", getCyclesByTontineHandler);

export default router;
