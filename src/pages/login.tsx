import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import DotGridBackground from '../components/DotGridBackground';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Anfrage an dein Backend (Express + PostgreSQL)
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login fehlgeschlagen");
      }

      console.log("Login erfolgreich:", data);

      // Token im LocalStorage speichern (falls du JWT nutzt)
      localStorage.setItem("token", data.token);

      // Weiterleitung nach erfolgreichem Login (z. B. Home)
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Ein unbekannter Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="auth-page">
    <DotGridBackground />

    <div className="auth-container">
      <h2>login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Benutzername"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Wird eingeloggt..." : "Einloggen"}
        </button>
      </form>

      <div className="auth-footer">
        <Link to="/forgot-password">Passwort vergessen?</Link>
        <br />
        <Link to="/register">Registrieren</Link>
      </div>
    </div>
  </div>
);
}

export default Login;
