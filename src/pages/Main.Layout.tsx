import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav style={{ padding: "10px 20px", background: "#282c34", color: "white", display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Home</Link>
        <Link to="/users" style={{ color: "white", textDecoration: "none" }}>👤 Users</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>📝 Register</Link>
      </nav>

      <main style={{ flex: 1, padding: "20px", background: "#f0f2f5" }}>
        {children}
      </main>

      <footer style={{ padding: "10px 20px", background: "#282c34", color: "white", textAlign: "center" }}>
        &copy; 2025 Azubi Onboarding
      </footer>
    </div>
  );
}
