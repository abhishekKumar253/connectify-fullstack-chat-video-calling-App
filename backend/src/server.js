import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`⚙️ Server is running on port ${PORT}`);
  connectDB();
});
