import { app } from "./api";
import { bot } from "./bot";
import dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("Missing DATABASE_URL");

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`API listening on ${PORT}`));

bot.startPolling().then(() => console.log("Bot is running"));
