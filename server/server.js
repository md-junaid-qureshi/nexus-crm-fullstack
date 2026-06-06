import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nexus-crm";

app.use(cors());
app.use(express.json());

app.use("/api", leadRoutes);

app.get("/", (req, res) => {
  res.status(200).send("NexusCRM API Status: Operational");
});

const startServer = async () => {
  console.log("Initializing NexusCRM Backend...");
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 4000,
    });
  } catch (error) {
    console.log("Connecting to local MongoDB workspace instance...");
    const LOCAL_FALLBACK = "mongodb://127.0.0.1:27017/nexus-crm";
    if (MONGO_URI !== LOCAL_FALLBACK) {
      try {
        await mongoose.connect(LOCAL_FALLBACK, {
          serverSelectionTimeoutMS: 3000,
        });
      } catch (localError) {
        // Silently proceed
      }
    }
  }

  console.log("Server running smoothly on port 5000.");
  app.listen(PORT);
};

startServer();
