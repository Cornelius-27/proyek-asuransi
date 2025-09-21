document.addEventListener('DOMContentLoaded', function() {
    const productMapping = {
        'checkout-jiwa.html': { name: 'Asuransi Jiwa', key: 'premiJiwa' },
        'checkout-kesehatan.html': { name: 'Asuransi Kesehatan', key: 'premiKesehatan' },
        'checkout-mobil.html': { name: 'Asuransi Mobil', key: 'premiMobil' }
    };

    const currentPage = window.location.pathname.split('/').pop();
    const productInfo = productMapping[currentPage];

    if (!productInfo) {
        console.error('Halaman checkout tidak dikenal!');
        return;
    }

    const premi = localStorage.getItem(productInfo.key);
    const premiCheckoutElement = document.getElementById('premiCheckout');

    if (premi && premiCheckoutElement) {
        premiCheckoutElement.textContent = premi;
    } else if (premiCheckoutElement) {
        premiCheckoutElement.textContent = 'Premi belum ditentukan';
    }

    const bayarBtn = document.querySelector('.btn-bayar');
    if (bayarBtn) {
        bayarBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const nama = document.getElementById('nama').value;
            const alamat = document.getElementById('alamat').value;
            const metode = document.getElementById('metode').value;

            if (!nama || !alamat || !metode) {
                alert('Nama, Alamat, dan Metode Pembayaran harus diisi.');
                return;
            }

            const history = JSON.parse(localStorage.getItem('history')) || [];

            const finalPremi = localStorage.getItem(productInfo.key) || 'Tidak ada';

        history.push({
            produk: productInfo.name,
            nama,
            alamat,
            premi: finalPremi,
            metode,
            tanggal: new Date().toLocaleString()
        });

            localStorage.setItem('history', JSON.stringify(history));
            console.log('Data riwayat disimpan:', history); 
            
            window.location.href = 'history.html';
        });
    }
});