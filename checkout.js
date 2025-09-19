document.addEventListener('DOMContentLoaded', function() {
    const premi = localStorage.getItem('premiJiwa');
    if (premi) {
        document.getElementById('premiJiwaCheckout').textContent = premi;
    }

    const bayarBtn = document.querySelector('.btn');
    bayarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const nama = document.getElementById('nama').value;
        const alamat = document.getElementById('alamat').value;

        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push({
            produk: 'Asuransi Jiwa',
            nama,
            alamat,
            premi,
            tanggal: new Date().toLocaleString()
        });
        localStorage.setItem('history', JSON.stringify(history));
        window.location.href = 'history.html';
    });
});