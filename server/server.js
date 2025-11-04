// server.js
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { getUsers, addUser } from "./models/users.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// ➕ Benutzerregistrierung
app.post("/api/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    console.log("📩 Request Body:", req.body);

    // Validierung
    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ error: "Alle Felder sind erforderlich" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer hinzufügen (Datenbankfunktion)
    const newUser = await addUser(first_name, last_name, email, hashedPassword, role);

    // Erfolgsmeldung senden
    res.status(201).json({
      message: "Benutzer erfolgreich registriert",
      user: newUser,
    });
} catch (err) {
  console.error("❌ Fehler bei der Registrierung:", err);
  res.status(500).json({ error: err.message || "Serverfehler bei der Registrierung " }); 
}
});




// 🧍‍♂️ Alle Benutzer abrufen
app.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Benutzer:", err);
    res.status(500).json({ error: "Serverfehler" });
  }
});

// 🔐 Benutzer-Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-Mail und Passwort sind erforderlich" });
  }

  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: "Benutzer nicht gefunden" });
    }

    // Passwort prüfen
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Ungültiges Passwort" });
    }

    // Dummy-Token
    const token = Math.random().toString(36).substring(2);
    res.json({ message: "Login erfolgreich", token, user });
  } catch (err) {
    console.error("❌ Fehler beim Login:", err);
    res.status(500).json({ error: "Serverfehler beim Login" });
  }
});

app.listen(port, () => console.log(`✅ Server läuft auf Port ${port}`));
export default app;
