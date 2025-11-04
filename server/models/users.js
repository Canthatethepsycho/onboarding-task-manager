// server/models/users.js
import sql from '../db.js';

// ➕ Benutzer hinzufügen
export async function addUser(first_name, last_name, email, password, role) {
  try {
    console.log('👤 Benutzer wird hinzugefügt:', first_name, last_name, email, role);

    const [createdUser] = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash, role)
      VALUES (${first_name}, ${last_name}, ${email}, ${password}, ${role})
      RETURNING id, first_name, last_name, email, role
    `;
    return createdUser;
  } catch (err) {
    console.error('❌ Fehler beim Anlegen des Benutzers:', err);
    throw err;
  }
}

// 👥 Benutzer abrufen
export async function getUsers() {
  try {
    const users = await sql`
      SELECT id, first_name, last_name, email, role
      FROM users
      LIMIT 10
    `;
    return users;
  } catch (err) {
    console.error('❌ Fehler beim Abrufen der Benutzer:', err);
    throw err;
  }
}
