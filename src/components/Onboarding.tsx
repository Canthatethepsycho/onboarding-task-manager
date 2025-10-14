import { useState } from 'react'
import './Onboarding.css'

export default function Onboarding() {
  const [tasks, setTasks] = useState<string[]>([
    'Einführung in die Firma',
    'IT-Zugang einrichten',
    'Team kennenlernen',
  ])

  const [newTask, setNewTask] = useState('')

  function addTask() {
    const value = newTask.trim()
    if (!value) return
    setTasks((t) => [...t, value])
    setNewTask('')
  }

  function toggleComplete(index: number) {
    // For demo: mark completed by removing from list
    setTasks((t) => t.filter((_, i) => i !== index))
  }

  return (
    <div className="onboard-root">
      <header className="onboard-header">
        <h1>Willkommen zum Azubi-Onboarding</h1>
        <p>Dein Einstieg ins Unternehmen leicht gemacht!</p>
      </header>

      <main className="onboard-main">
        <section className="onboard-section">
          <h2>Aufgabenliste</h2>
          <ul className="task-list">
            {tasks.map((task, i) => (
              <li key={i}>
                <span>{task}</span>
                <button onClick={() => toggleComplete(i)}>✔</button>
              </li>
            ))}
          </ul>

          <div className="task-controls">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Neue Aufgabe hinzufügen..."
            />
            <button onClick={addTask}>Hinzufügen</button>
          </div>
        </section>

        <section className="onboard-section">
          <h2>Wichtige Links</h2>
          <ul>
            <li>
              <a href="#">Mitarbeiterportal</a>
            </li>
            <li>
              <a href="#">Unternehmenshandbuch</a>
            </li>
            <li>
              <a href="#">FAQ für Azubis</a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="onboard-footer">© 2025 Dein Unternehmen | Azubi Onboarding</footer>
    </div>
  )
}
