// users.js (ES module)
import sql from '../db.js'

export async function getUsers() {
  try {
    const users = await sql`
      SELECT id, first_name, last_name, email
      FROM users
      LIMIT 10
    `
    return users
  } catch (err) {
    console.error('❌ Fehler beim Abrufen der Benutzer:', err)
    throw err
  }
}

// helper: fetch single user by id (optional)
export async function getUser(id) {
  const user = await sql`
    SELECT id, first_name, last_name, email
    FROM users
    WHERE id = ${id}
  `
  return user[0] ?? null
}

  