import express from "express";
import cors from "cors";
import { getUsers } from "./models/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
