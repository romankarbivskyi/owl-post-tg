import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.TEMP_MAIL_API_URL || "";
export const API = axios.create({
  baseURL: apiUrl,
});
