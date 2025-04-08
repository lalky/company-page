module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status (405).json({ message: 'Method Not Allowed' });
    }

    const { nama, email, message } = req.body;

    // validasi input
    if (!nama || !email || !message) {
        return res.status(400).send('Semua bidang harus diisi!.');
    }
    
    res.status(200).json({ message: 'Success from Vercel API!' });
};
