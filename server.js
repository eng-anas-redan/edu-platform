import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import commentRoutes from "./routes/commentRoutes.js";
import requestRoutes from "./routes/requestRoutes.js"
import dotenv from "dotenv";
import { upload } from "./middleware/upload.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// استخدام routes
app.use("/api", articleRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", requestRoutes);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb://anas23ry_db_user:mongodb%40react@ac-tbnusil-shard-00-00.odkpvdl.mongodb.net:27017,ac-tbnusil-shard-00-01.odkpvdl.mongodb.net:27017,ac-tbnusil-shard-00-02.odkpvdl.mongodb.net:27017/?ssl=true&replicaSet=atlas-nz26ul-shard-0&authSource=admin&appName=Cluster0",
  )
  .then(() => {
    console.log("connected");

    app.listen(5000, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((error) => {
  console.log("NAME:", error.name);
  console.log("MESSAGE:", error.message);

  if (error.reason?.servers) {
    for (const [host, server] of error.reason.servers) {
      console.log("\nHOST:", host);
      console.log("SERVER ERROR:", server.error);
    }
  }
});
