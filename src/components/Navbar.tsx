// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import "./Navbar.css"; // optional für Styling

function Navbar() {
  return (
    <nav className="navbar flex items-center justify-between p-4">
      <h2 className="logo text-lg font-bold">MyApp</h2>

      <div className="nav-links flex items-center gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
          Users
        </NavLink>

        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>

        <Link to="/register">
          <Button variant="primary">Registrieren</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
