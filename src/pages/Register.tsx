import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DotGridBackground from '../components/DotGridBackground';
import "../auth.css"
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [first_Name, setFirstName] = useState('');
  const [last_Name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1️⃣ Registrierung
    console.log('Registriere Benutzer mit:', { first_Name, last_Name, email, password, role });
    
    const registerRes = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: first_Name,
        last_name: last_Name,
        email,
        password,
        role
      }),
    });

    if (!registerRes.ok) throw new Error('Fehler bei der Registrierung');

    const registerData = await registerRes.json();
    console.log('Erfolgreich registriert:', registerData);

    // 2️⃣ Direkt einloggen
    const loginRes = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) throw new Error('Login fehlgeschlagen');

    const loginData = await loginRes.json();
    console.log('Erfolgreich eingeloggt:', loginData);

    // 3️⃣ Weiterleitung auf Onboarding-Seite
    navigate('/'); // "/" ist hier deine Onboarding-Seite

  } catch (error) {
    console.error(error);
    alert((error as Error).message);
  }
};


  

  return (
    <div className="auth-page">
      <DotGridBackground />
      <div className="auth-container">
        <h2>📝 Registrieren</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" placeholder="Vorname" value={first_Name} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Nachname" value={last_Name} onChange={e => setLastName(e.target.value)} required />
          <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Registrieren</button>
        </form>
     


        <div className="auth-footer">
          Schon registriert? <Link to="/login">Einloggen</Link>
        </div>
      </div>
    </div>
  );
}

