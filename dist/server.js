"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("./swagger"));
const tontineRoutes_1 = __importDefault(require("./routes/tontineRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cycleRoutes_1 = __importDefault(require("./routes/cycleRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, swagger_1.default)(app);
app.use('/api', tontineRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use("/api/cycles", cycleRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Tontine API");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
