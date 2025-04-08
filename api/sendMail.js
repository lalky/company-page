module.exports = async (req, res) => {
    if (req.method === 'POST') {
        
        const { nama, email, message } = req.body;
        
        if (!nama || !email || !message) {
            return res.status(400).send('Semua bidang harus diisi!.');
        }
            return res.status(200).json({ message: `Halo ${name}, pesan kamu: "${message}" sudah diterima yaa.` });
    }
    
    res.status(200).json({ message: 'Success from Vercel API!' });
};
