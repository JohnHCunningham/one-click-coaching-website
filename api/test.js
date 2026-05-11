/**
 * Simple test endpoint to verify Vercel Functions work
 */
export default async function handler(req, res) {
  return res.status(200).json({
    status: 'ok',
    message: 'Test endpoint is working',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
