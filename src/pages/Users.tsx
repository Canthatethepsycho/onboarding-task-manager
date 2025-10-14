import '../App.css'
import { useEffect, useState } from 'react'

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Fehler beim Laden der Benutzer')
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Lade Benutzer...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="users-container" style={{ height: '500px', overflowY: 'scroll' }}>
      <input
        type="text"
        placeholder="Nach Benutzer suchen"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => alert('Button geklickt!')}>Klick mich</button>
      <div className="users">
        <h1>👤 Benutzerliste</h1>
        {filteredUsers.length === 0 ? (
          <p>Keine Benutzer gefunden.</p>
        ) : (
          <ul>
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
