import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import DotGridBackground from '../components/DotGridBackground';
import { ToastContainer, useToast } from '../components/Toast';
import { apiCall, saveToken, validateEmail } from '../utils/authUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Validierung: Email
      if (!validateEmail(email)) {
        addToast('Bitte geben Sie eine gültige E-Mail Adresse ein', 'error');
        setLoading(false);
        return;
      }

      if (!password) {
        addToast('Passwort ist erforderlich', 'error');
        setLoading(false);
        return;
      }

      // Anfrage an dein Backend (Express + PostgreSQL)
      const data = await apiCall("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.error) {
        addToast(data.error, 'error');
        setLoading(false);
        return;
      }

      console.log("Login erfolgreich:", data);

      // ✅ Token speichern
      if (data.token) {
        saveToken(data.token);
      }

      addToast('Login erfolgreich!', 'success');
      
      // Weiterleitung nach erfolgreichem Login
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      addToast(err.message || "Ein unbekannter Fehler ist aufgetreten", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <DotGridBackground />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="auth-container">
        <h2>🔐 Einloggen</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail Adresse"
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
