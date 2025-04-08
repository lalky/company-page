export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('POST request received!');
    return res.status(200).json({ message: 'POST berhasil!' });
  } else {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
