import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/users.routs";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

export default app;
