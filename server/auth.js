// server/auth.js - JWT utilities
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-not-for-production'

/**
 * Generiere einen JWT Token für einen Benutzer
 * @param {Object} user - User Objekt mit mindestens { id, email }
 * @returns {string} JWT Token
 */
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * Verifiziere einen JWT Token
 * @param {string} token - JWT Token
 * @returns {Object|null} Payload falls gültig, null falls ungültig
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.error('❌ Token Verification Failed:', err.message)
    return null
  }
}

/**
 * Middleware zum Überprüfen des Auth Headers
 * @param {Object} req - Express Request
 * @param {Object} res - Express Response
 * @param {Function} next - Nächste Middleware
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentifizierung erforderlich' })
  }

  const token = authHeader.substring(7) // "Bearer " entfernen
  const payload = verifyToken(token)

  if (!payload) {
    return res.status(401).json({ error: 'Ungültiger oder abgelaufener Token' })
  }

  req.user = payload
  next()
}
