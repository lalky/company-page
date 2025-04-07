require('dotenv').config({ path: '../.env' });
const ratelimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

const app = express();

// middleware keamanan
app.use(helmet());
app.use(express.json());
app.use(cors());

const limiter = ratelimit({
    windowMs: 1 * 60 * 100, // 1 menit
    max: 3,
    message: 'Terlalu banyak permintaan. Silakan coba lagi nanti.'
});
app.use(limiter);

/* Cek apakah .env terbaca
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");*/

// Endpoint untuk mengirim email
app.post('/', async  (req, res) => {
    const { nama, email, message } = req.body;
    console.log('Data sudah diterima oleh server!');

    // Validasi input (jangan kosong)
    if (!nama || !email || !message) {
        return res.status(400).send('Semua bidang harus diisi!.');
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Format email salah.');
        }

    // Konfigurasi transporter nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    //verifi koneksi konfigurasi
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take message:");
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,
        subject: `Pesan dari ${nama}`,
        text: message
    };

    try {
        // Kirim email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email berhasil dikirim:', info.response);
        res.status(200).json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error('Gagal mengirim email:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email.' });
    }
});

// Jalankan server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));