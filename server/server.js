// server.js
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getUsers, addUser } from "./models/users.js";
import { generateToken, verifyToken, authMiddleware } from "./auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// CORS mit Umgebungsvariablen
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());



// ➕ Benutzerregistrierung
app.post("/api/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    console.log("📩 Request Body:", req.body);

    // ✅ Validierung: Alle Felder erforderlich
    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ error: "Alle Felder sind erforderlich" });
    }

    // ✅ Validierung: Namen (mindestens 2 Zeichen)
    if (first_name.length < 2 || last_name.length < 2) {
      return res.status(400).json({ error: "Vor- und Nachname müssen mindestens 2 Zeichen lang sein" });
    }

    // ✅ Validierung: Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail Format" });
    }

    // ✅ Validierung: Passwort (mindestens 8 Zeichen)
    if (password.length < 8) {
      return res.status(400).json({ error: "Passwort muss mindestens 8 Zeichen lang sein" });
    }

    // ✅ Validierung: Role (user oder admin)
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Ungültige Role" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer hinzufügen (Datenbankfunktion)
    const newUser = await addUser(first_name, last_name, email, hashedPassword, role);

    // ✅ JWT Token generieren
    const token = generateToken(newUser);

    // Erfolgsmeldung senden
    res.status(201).json({
      message: "Benutzer erfolgreich registriert",
      token,
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ Fehler bei der Registrierung:", err);
    res.status(500).json({ error: err.message || "Serverfehler bei der Registrierung" });
  }
});




// 🧍‍♂️ Alle Benutzer abrufen (geschützt - nur für eingeloggte Benutzer)
app.get("/api/users", authMiddleware, async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Benutzer:", err);
    res.status(500).json({ error: "Serverfehler" });
  }
});

// ✅ Token Validierung - Endpoint für Frontend um Token zu prüfen
app.post("/api/auth/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// 🔐 Benutzer-Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Input Validierung
  if (!email || !password) {
    return res.status(400).json({ error: "E-Mail und Passwort sind erforderlich" });
  }

  // ✅ Email Validierung
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail Format" });
  }

  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: "Benutzer nicht gefunden" });
    }

    // Passwort prüfen
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Ungültiges Passwort" });
    }

    // ✅ JWT Token generieren
    const token = generateToken(user);
    res.json({
      message: "Login erfolgreich",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Fehler beim Login:", err);
    res.status(500).json({ error: "Serverfehler beim Login" });
  }
});

app.listen(port, () => console.log(`✅ Server läuft auf Port ${port}`));
export default app;
