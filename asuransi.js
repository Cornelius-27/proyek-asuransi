document.addEventListener('DOMContentLoaded', () => {
    // Sign Up Form: Menyimpan data ke localStorage
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Konfirmasi kata sandi tidak cocok!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert('Email ini sudah terdaftar. Silakan gunakan email lain.');
                return;
            }

            const newUser = { fullName, email, phone, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Pendaftaran berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    // Login Form: Memeriksa data dari localStorage
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert(`Login berhasil! Selamat datang, ${user.fullName}`);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'asuransi.html';
            } else {
                alert('Email atau kata sandi yang Anda masukkan salah.');
            }
        });
    }

    // BAGIAN PERHITUNGAN PREMI ASURANSI
    // --- Perhitungan Asuransi Mobil ---
    const carInsuranceForm = document.getElementById('carInsuranceForm');
    if (carInsuranceForm) {
        carInsuranceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const carYear = parseInt(document.getElementById('carYear').value);
            const carPrice = parseFloat(document.getElementById('carPrice').value);
            const currentYear = new Date().getFullYear();
            const carAge = currentYear - carYear; 

            let premiumRate = 0; 
            
          
            if (carAge <= 3) {
                premiumRate = 0.025; 
            } 
            
            else if (carAge > 3 && carAge <= 5) {
                if (carPrice < 200000000) {
                    premiumRate = 0.04; t
                } else {
                    premiumRate = 0.03; 
                }
            } 
           
            else if (carAge > 5) {
                premiumRate = 0.05; 
            }

          
            const premium = carPrice * premiumRate;
            document.getElementById('carPremiumAmount').textContent = `Rp ${premium.toLocaleString('id-ID')}`;
            document.getElementById('carPremiumResult').style.display = 'block';
        });
    }

    // --- Perhitungan Asuransi Kesehatan ---
    const healthInsuranceForm = document.getElementById('healthInsuranceForm');
    if (healthInsuranceForm) {
        healthInsuranceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dob = new Date(document.getElementById('dob').value);
            const age = new Date().getFullYear() - dob.getFullYear();
            const isSmoker = parseInt(document.getElementById('smoker').value);
            const hasHypertension = parseInt(document.getElementById('hypertension').value); 
            const hasDiabetes = parseInt(document.getElementById('diabetes').value);
            
            const basePremium = 2000000; 
            let ageMultiplier = 0; 

            if (age <= 20) ageMultiplier = 0.1;
            else if (age > 20 && age <= 35) ageMultiplier = 0.2;
            else if (age > 35 && age <= 50) ageMultiplier = 0.25;
            else if (age > 50) ageMultiplier = 0.4;

            // Rumus: Premi = P + (m*P) + (k1*0.5*P) + (k2*0.4*P) + (k3*0.5*P)
            const premium = basePremium + (ageMultiplier * basePremium) + (isSmoker * 0.5 * basePremium) + (hasHypertension * 0.4 * basePremium) + (hasDiabetes * 0.5 * basePremium);
            
            document.getElementById('healthPremiumAmount').textContent = `Rp ${premium.toLocaleString('id-ID')}`;
            document.getElementById('healthPremiumResult').style.display = 'block';
        });
    }

    // --- Perhitungan Asuransi Jiwa ---
    const lifeInsuranceForm = document.getElementById('lifeInsuranceForm');
    if (lifeInsuranceForm) {
        lifeInsuranceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dob = new Date(document.getElementById('dob').value);
            const age = new Date().getFullYear() - dob.getFullYear(); 
            const coverage = parseFloat(document.getElementById('coverage').value); 

            let premiumRate = 0; 
            
          
            if (age <= 30) premiumRate = 0.002; 
            else if (age > 30 && age <= 50) premiumRate = 0.004; 
            else if (age > 50) premiumRate = 0.01; 

            // Rumus: Premi = Faktor Premi * Uang Pertanggungan
            const premium = premiumRate * coverage;
            document.getElementById('lifePremiumAmount').textContent = `Rp ${premium.toLocaleString('id-ID')}`;
            document.getElementById('lifePremiumResult').style.display = 'block';
        });
    }

    // Auth Buttons: Menampilkan tombol Logout jika sudah login
    const authButtons = document.getElementById('auth-buttons');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        authButtons.innerHTML = `
            <button class="btn btn-secondary" id="logout-btn">Logout</button>
        `;
        document.getElementById('logout-btn').onclick = function() {
            localStorage.removeItem('isLoggedIn');
            location.reload();
        };
    }

    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                e.preventDefault();
                window.location.href = 'login.html'; 
            }
        });
    });
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const premi = document.getElementById('lifePremiumAmount').textContent;
            localStorage.setItem('premiJiwa', premi);
        });
    }
});