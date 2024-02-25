import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import connectDB from "./db/connect";

import search from "./routes/search";

const app = express();

connectDB(process.env.MONGO_URI || "");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use("/search", search);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
