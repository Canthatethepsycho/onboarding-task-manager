// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // optional für Styling

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">MyApp</h2>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
          Login
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
          Users
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
