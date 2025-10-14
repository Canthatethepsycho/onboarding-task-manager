import { BrowserRouter, Route, Routes, Link  } from "react-router-dom";

import Login from './login';  

import Users from './Users';

import Navbar from "../components/Navbar";



import Home from ".//Home";




function App() {
  return (


    <BrowserRouter>

      <nav style={{ padding: "10px", background: "#eee" }}>
        {/* Navigation */}
        <Link to="/" style={{ marginRight: "10px" }}>🏠 Home</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>🔑 Login</Link>
        <Link to="/users">👤 Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/Users" element={<Users />} />

      </Routes>
    </BrowserRouter>
    

  );

};






<Route path="/login" element={<Login />} />
import '../App.css'




<Route path="/login" element={<Login />} />



import { useEffect, useState } from 'react'



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

export default Users;
