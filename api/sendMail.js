// File: api/sendMail.js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (req, res) => {
    if (req.method === 'GET') {
      return res.status(200).json({ message: 'GET berhasil! API aktif.' });
    }
  
    if (req.method === 'POST') {
      try {
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

        // Simulasi proses async 
        await delay (1000); // delay 1 detik 
        
        // Misalnya kamu ingin logging aja dulu (belum pakai nodemailer)
        console.log('Data diterima:', { nama, email, message });

        return res.status(200).json({ message: 'POST berhasil! Data diterima.' });
      } catch (error) {
        console.error('Terjadi error saat memproses POST:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
      }
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  };
  