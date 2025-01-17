import express from "express";
import cors from "cors";
import emailRoute from "./routes/email.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import usersRoute from "./routes/users.route";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/emails", emailRoute);
app.use("/api/users", usersRoute);

app.use(errorMiddleware as any);
