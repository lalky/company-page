require('dotenv').config();
const nodemailer = require('nodemailer')

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status (405).json({ message: 'Method Not Allowed' });
    }

    const { nama, email, message } = req.body;

    // validasi input
    if (!nama || !email || !message) {
        return res.status(400).send('Semua bidang harus diisi!.');
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format email salah.' });
    }

    // Konfigurasi transporter nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,
        subject: `Pesan dari ${nama}`,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email berhasil dikirim:', info.response);
        res.status(200).json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error('Gagal mengirim email:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email.'});
    }
};