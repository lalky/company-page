module.exports =  (req, res) => {
    if (req.method === 'GET') {
      return res.status(200).json({ message: 'GET berhasil! API aktif.' });
    } else if (req.method === 'POST') {
      const { name, email, message } = req.body;

      // Validasi input
      if (!name || !email || !message) { 
        return res.status(400).json({ message: 'Semua bidang harus diisi!' });
      }
        
      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format email tidak valid.' });
      }

      // Misalnya kamu ingin logging aja dulu (belum pakai nodemailer)
      console.log('Data diterima:', { nama, email, message });

      return res.status(200).json({ message: 'POST berhasil! Data diterima.' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  };
  