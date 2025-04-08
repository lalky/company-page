export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama, email, message } = req.body;

  if (!nama || !email || !message) {
    return res.status(400).json({ message: 'Semua bidang harus diisi.' });
  }

  return res.status(200).json({ message: 'Email berhasil dikirim!' });
}
