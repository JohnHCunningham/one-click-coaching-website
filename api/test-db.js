/**
 * Test @vercel/postgres import
 */
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT NOW()`;
    return res.status(200).json({
      status: 'ok',
      message: 'Database connection works',
      time: result.rows[0].now
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
      stack: error.stack
    });
  }
}
