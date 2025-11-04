import '../App.css' // Importiert die globale CSS-Datei für das Styling


import { useEffect, useState } from 'react' // Importiert React Hooks für State und Lifecycle-Methoden

// Typdefinition für einen Benutzer, nützlich für TypeScript zur Typprüfung
type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
}











export default function Users() {
  // State für die Benutzerliste
  const [users, setUsers] = useState<User[]>([])
  // State, um den Ladezustand zu tracken
  const [loading, setLoading] = useState(true)
  // State, um mögliche Fehler zu speichern
  const [error, setError] = useState<string | null>(null)
  // State für die Sucheingabe
  const [search, setSearch] = useState('')

  // useEffect läuft einmal beim Mounten der Komponente (leeres Abhängigkeitsarray [])
  useEffect(() => {
    // API Call, um Benutzer vom Backend zu holen
    fetch('http://localhost:3000/api/users')
      .then((res) => {
        // Prüft, ob die Antwort erfolgreich war
        if (!res.ok) throw new Error('Fehler beim Laden der Benutzer')
        return res.json() // Wandelt die Antwort in JSON um
      })
      .then((data) => setUsers(data)) // Speichert die Benutzer im State
      .catch((err) => setError(err.message)) // Setzt den Fehler-Message State, falls etwas schiefgeht
      .finally(() => setLoading(false)) // Beendet den Ladezustand, egal ob Erfolg oder Fehler
  }, [])

  // Ladeanzeige, solange der API Call läuft
  if (loading) return <p>Lade Benutzer...</p>
  // Anzeige, falls ein Fehler auftritt
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  // Filtert die Benutzer nach dem Suchbegriff (case-insensitive)
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (

    
    <div className="users-container" style={{ height: '500px', overflowY: 'scroll' }}>
      {/* Suchfeld */}
      <input
        type="text"
        placeholder="Nach Benutzer suchen"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Aktualisiert den Search-State bei Eingabe
      />
      {/* Ein Button zum Testen */}
      <button onClick={() => alert('Button geklickt!')}>Klick mich</button>

      <div className="users">
        <h1>👤 Benutzerliste</h1>
        {filteredUsers.length === 0 ? (
          // Anzeige, wenn kein Benutzer gefunden wurde
          <p>Keine Benutzer gefunden.</p>
        ) : (
          <ul>
            {/* Benutzerliste rendern */}
            {filteredUsers.map((u) => (
              <li key={u.id}>
                <strong>
                  {u.first_name} {u.last_name}
                </strong>{' '}
                – {u.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
