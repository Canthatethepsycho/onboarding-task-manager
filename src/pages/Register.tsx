import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DotGridBackground from '../components/DotGridBackground';
import { ToastContainer, useToast } from '../components/Toast';
import {
  apiCall,
  saveToken,
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/authUtils';
import "../auth.css"

export default function Register() {
  const [first_Name, setFirstName] = useState('');
  const [last_Name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);

  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  // Validiere Passwort in Echtzeit
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setPasswordStrength(validatePassword(value));
    } else {
      setPasswordStrength(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Validierung: Namen
      const firstNameError = validateName(first_Name, 'Vorname');
      if (firstNameError) {
        addToast(firstNameError, 'error');
        setLoading(false);
        return;
      }

      const lastNameError = validateName(last_Name, 'Nachname');
      if (lastNameError) {
        addToast(lastNameError, 'error');
        setLoading(false);
        return;
      }

      // ✅ Validierung: Email
      if (!validateEmail(email)) {
        addToast('Bitte geben Sie eine gültige E-Mail Adresse ein', 'error');
        setLoading(false);
        return;
      }

      // ✅ Validierung: Passwort
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        addToast(passwordValidation.errors.join('. '), 'error');
        setLoading(false);
        return;
      }

      // ✅ Validierung: Passwort Bestätigung
      if (password !== confirmPassword) {
        addToast('Passwörter stimmen nicht überein', 'error');
        setLoading(false);
        return;
      }

      // Registrierung
      const registerData = await apiCall('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          first_name: first_Name,
          last_name: last_Name,
          email,
          password,
          role: 'user',
        }),
      });

      if (registerData.error) {
        addToast(registerData.error, 'error');
        setLoading(false);
        return;
      }

      // ✅ Token speichern
      if (registerData.token) {
        saveToken(registerData.token);
      }

      addToast('Registrierung erfolgreich!', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      addToast((error as Error).message || 'Ein Fehler ist aufgetreten', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <DotGridBackground />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <div className="auth-container">
        <h2>📝 Registrieren</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Vorname"
            value={first_Name}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nachname"
            value={last_Name}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => handlePasswordChange(e.target.value)}
            required
          />
          
          {/* ✅ Passwort Stärke Anzeige */}
          {passwordStrength && !passwordStrength.valid && (
            <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '10px' }}>
              <p>Passwortanforderungen:</p>
              <ul style={{ marginLeft: '20px' }}>
                {passwordStrength.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <input
            type="password"
            placeholder="Passwort bestätigen"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Wird registriert...' : 'Registrieren'}
          </button>
        </form>

        <div className="auth-footer">
          Schon registriert? <Link to="/login">Einloggen</Link>
        </div>
      </div>
    </div>
  );
}

