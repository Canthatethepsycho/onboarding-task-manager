
  // imports ----------------------------------------------------------------------------------------------------------|

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from './login';  
import Users from './Users';
import Home from "./Home";
import Register from "./Register";
import ForgotPassword from './ForgotPassword';
import "../App.css";
import MainLayout from "../components/MainLayout";

import { useEffect, useState } from "react";



// function APP ----------------------------------------------------------------------------------------------------------|


export default function App() {
  return (
    <Routes>
      {/* Fullscreen Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register/>} />
      {/* Layout-Seiten */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
    </Routes>
  );
}


// Define User type for TypeScript

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

// --- IGNORE ---

function loadUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Benutzer");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Lade Benutzer...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;



  return (
    <div className="users">
      <h1>👤 Benutzerliste</h1>
      {users.length === 0 ? (
        <p>Keine Benutzer gefunden.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <strong>{u.first_name} {u.last_name}</strong> – {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
