import { Link } from "react-router-dom"


export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Willkommen bei deiner Onboarding-App 🚀</h1>
        <p>
          Hier startest du dein persönliches Onboarding-Erlebnis. Einfach, klar und auf dich zugeschnitten.
        </p>
        <div className="home-buttons">
          <Link to="/register" className="btn primary">Jetzt starten</Link><br></br>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features">
        <h2>Was dich erwartet</h2>
        <div className="feature-grid">
          <div className="feature">
            <div className="icon">👤</div>
            <h3>Einfache Registrierung</h3>
            <p>Erstelle dein Konto in wenigen Sekunden und starte sofort mit deinem Onboarding.</p>
          </div>
          <div className="feature">
            <div className="icon">⚡</div>
            <h3>Schneller Einstieg</h3>
            <p>Alle Schritte sind klar erklärt, sodass du dich mühelos zurechtfindest.</p>
          </div>
          <div className="feature">
            <div className="icon">🎯</div>
            <h3>Klare Ziele</h3>
            <p>Verfolge deinen Fortschritt Schritt für Schritt und erreiche dein Ziel sicher.</p>
          </div>
          <div className="feature">
            <div className="icon">✅</div>
            <h3>Erfolgreich abschließen</h3>
            <p>Abschließen, verstehen, loslegen – dein Weg ist klar und transparent.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Bereit loszulegen?</h2>
        <p>Erstelle jetzt dein Konto und starte dein persönliches Onboarding!</p>
        <Link to="/register" className="btn primary big">Kostenlos starten</Link>
      </section>
    </div>
  )
}
