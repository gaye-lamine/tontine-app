import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import setupSwagger from "./swagger"; 
import tontineRoute from "./routes/tontineRoutes";
import authRoute from "./routes/authRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use(tontineRoute);
app.use('/auth', authRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Tontine API");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
