import express from "express";
import authRouter from "./routes/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import serviceRouter from "./routes/service.js";

dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((allowed) => origin.startsWith(allowed))
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/auth", authRouter);
app.use("/services", serviceRouter);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(` Server running on port: ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use(errorHandler);

export default app;
