// db.js (ES module)
import postgres from 'postgres'

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'onboarding',
    user: 'postgres',
    password: 'sudo',
})

export default sql