import { useState } from 'react';
import DotGridBackground from '../components/DotGridBackground';
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwörter stimmen nicht überein.');
      return;
    }

    try {
      const response = await fetch('https://dein-backend.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error('Fehler beim Zurücksetzen');

      setMessage('Passwort erfolgreich geändert.');
    } catch (error) {
      setMessage('Fehler: ' + error);
    }
  };

  return (
    <div className="auth-page">
   <DotGridBackground />
    <div className="auth-container">




      
      <h2>Neues Passwort setzen</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Neues Passwort:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Passwort bestätigen:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Speichern</button>
      </form>
      {message && <p>{message}</p>}
        <div className="auth-footer">
        <br></br>
        <Link to="/login">Zurück zum Login</Link>
        </div>
      </div>

    </div>
    
  );
}
