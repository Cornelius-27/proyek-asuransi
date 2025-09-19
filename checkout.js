document.addEventListener('DOMContentLoaded', function() {
    // Objek untuk memetakan nama file ke nama produk dan kunci localStorage
    const productMapping = {
        'checkout-jiwa.html': { name: 'Asuransi Jiwa', key: 'premiJiwa' },
        'checkout-kesehatan.html': { name: 'Asuransi Kesehatan', key: 'premiKesehatan' },
        'checkout-mobil.html': { name: 'Asuransi Mobil', key: 'premiMobil' }
    };

    // Mendeteksi halaman saat ini dari URL
    const currentPage = window.location.pathname.split('/').pop();
    const productInfo = productMapping[currentPage];

    if (!productInfo) {
        console.error('Halaman checkout tidak dikenal!');
        return;
    }

    // Mengambil premi dari localStorage sesuai dengan produknya
    const premi = localStorage.getItem(productInfo.key);

    // Menampilkan premi di halaman checkout
    const premiCheckoutElement = document.getElementById('premiCheckout');
    if (premi && premiCheckoutElement) {
        premiCheckoutElement.textContent = premi;
    }

    // Menangani proses pembayaran
    const bayarBtn = document.querySelector('.btn-bayar'); // Gunakan class khusus untuk tombol bayar
    if (bayarBtn) {
        bayarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const alamat = document.getElementById('alamat').value;

            if (!nama || !alamat) {
                alert('Nama dan Alamat harus diisi.');
                return;
            }

            const history = JSON.parse(localStorage.getItem('history')) || [];
            history.push({
                produk: productInfo.name, // Gunakan nama produk yang dinamis
                nama,
                alamat,
                premi,
                tanggal: new Date().toLocaleString()
            });

            localStorage.setItem('history', JSON.stringify(history));
            window.location.href = 'history.html';
        });
    }
});