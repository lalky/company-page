// Ambil elemen
const btnContact = document.getElementById('btn-contact');
const modal = document.getElementById('modal-contact');
const modalClose = document.getElementById('modal-close');
const form = document.getElementById('contact-form');

// Ketika tombol "hubungi developer" diklik
btnContact.addEventListener('click', () => {
    modal.style.display = 'flex'; // tampilkan modal
});

// Ketika tombol "close" diklik
modalClose.addEventListener('click', () => {
    modal.style.display = 'none'; // sembunyikan modal
    form.reset(); // Reset form
});

// Ketika pengguna mengklik area di luar modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // sembunyikan modal
        form.reset(); // Reset form
    }
});

// efek pada kursor
document.addEventListener("mousemove", (e) => {
    const container = document.querySelector(".not-found-container");
    const { clientX, clientY } = e;

    // Efek parallax dengan mengikuti posisi kursor
    const moveX = (clientX / window.innerWidth) * 10 - 5;
    const moveY = (clientY / window.innerHeight) * 10 - 5;

    container.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// FETCH API
async function dataSend() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const url = '/sendMail';
    const data = { nama: name, email: email, message: message };

    console.log('Mengirim data:', data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log('Status respons:', response.status);

        // menangani respon yang diterima
        if (response.ok) {
            const responseData = await response.json();
            console.log('Data respons:', responseData);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Pesan Anda berhasil dikirim.',
            });

            form.reset(); // reset form setelah sukses
            modal.style.display = 'none'; // tutup modal
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: result.message || 'Terjadi kesalahan saat mengirim pesan.',
            });
            console.error('Server error!');
        }
    } catch (error) {
        console.error('Error saat mengirim email:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan! Periksa koneksi internet Anda.',
        });
    }
}

// eventlistener untuk submit form
form.addEventListener("submit", (e) => {
    e.preventDefault(); // mencegah form reload halaman
    dataSend();
});

document.getElementById('btn-home').addEventListener('click', function(event) {
    event.preventDefault();

    Swal.fire({
        title: 'Info',
        text: 'Maaf, fitur ini belum tersedia saat ini.',
        icon: 'info'
    });
});
