document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('history')) || [];

    if (history.length === 0) {
        historyList.innerHTML = '<p>Belum ada riwayat pembelian.</p>';
    } else {
        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <strong>${item.produk || 'Produk Tidak Dikenal'}</strong><br>
                Nama: ${item.nama || 'Tidak tersedia'}<br>
                Alamat: ${item.alamat || 'Tidak tersedia'}<br>
                Premi: ${item.premi || 'Tidak tersedia'}<br>
                Metode: ${item.metode || 'Tidak dipilih'}<br>
                Tanggal: ${item.tanggal || 'Tidak tersedia'}
            </div>
        `).join('');
    }
});