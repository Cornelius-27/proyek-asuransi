document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.length === 0) {
        historyList.innerHTML = '<p>Belum ada riwayat pembelian.</p>';
    } else {
        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <strong>${item.produk}</strong><br>
                Nama: ${item.nama}<br>
                Alamat: ${item.alamat}<br>
                Tanggal: ${item.tanggal}
            </div>
        `).join('');
    }
});