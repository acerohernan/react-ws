import express from "express";
import { config } from "dotenv";

config();

const port = process.env.PORT;
const app = express();

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`);
});
