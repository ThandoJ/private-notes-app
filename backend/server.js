import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
 origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://https://private-notes-app-tau.vercel.app"
],
credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});