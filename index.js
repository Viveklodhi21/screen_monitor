import express, { json } from "express";
const app = express();
import { config } from "dotenv";
import cors from "cors";

// MIDDLEWEARES
config({ path: "./config/config.env" });
import Db from "./config/Db.js";
import apiRouter from "./routes/api.js";
let PORT = 5000;
Db();

app.use(cors());
app.use(json());

// ROUTES

app.get("/", (req, res) => {
  res.send("The server is running.....");
});

app.use("/api/", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
