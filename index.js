import express from "express";
import authRoute from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect("mongodb://localhost:27017/sejutacita").then(() => {
  console.log("Mongodb connected");
});

app.use(express.json());
app.use("/api/user", authRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
