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
    }

    const bayarBtn = document.querySelector('.btn-bayar'); 
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
                produk: productInfo.name, 
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