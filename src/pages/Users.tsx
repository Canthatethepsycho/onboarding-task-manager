import '../App.css'
import { useEffect, useState } from 'react'
import { ToastContainer, useToast } from '../components/Toast'
import { apiCall } from '../utils/authUtils'

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { toasts, addToast, removeToast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiCall('/api/users', { method: 'GET' })
        
        if (data.error) {
          addToast(data.error, 'error')
          return
        }
        
        setUsers(data)
        addToast('Benutzer erfolgreich geladen', 'success')
      } catch (err) {
        addToast((err as Error).message || 'Fehler beim Laden der Benutzer', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Lade Benutzer...</p>

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="users-container" style={{ height: '500px', overflowY: 'scroll' }}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <input
        type="text"
        placeholder="Nach Benutzer suchen"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="users">
        <h1>👤 Benutzerliste ({filteredUsers.length})</h1>
        {filteredUsers.length === 0 ? (
          <p>Keine Benutzer gefunden.</p>
        ) : (
          <ul>
            {filteredUsers.map((u) => (
              <li key={u.id}>
                <strong>{u.first_name} {u.last_name}</strong> – {u.email}
                <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                  ({u.role})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
