// Data pengguna (dalam aplikasi nyata, ini akan diambil dari database)
const users = [
    {
        id: 1,
        username: 'superadmin',
        password: 'superadmin123',
        role: 'super_administrator',
        name: 'Super Administrator'
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin123',
        role: 'administrator',
        name: 'Administrator'
    },
    {
        id: 3,
        username: 'guru',
        password: 'guru123',
        role: 'guru',
        name: 'Guru Matematika'
    },
    {
        id: 4,
        username: 'siswa',
        password: 'siswa123',
        role: 'siswa',
        name: 'Andi Pratama'
    }
];

// Fungsi untuk menangani login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Cek kredensial
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Simpan data user di localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect ke dashboard
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Username atau password salah!';
                document.getElementById('loginMessage').className = 'message error';
            }
        });
    }
    
    // Fungsi logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // Cek apakah user sudah login
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser && window.location.pathname.endsWith('dashboard.html')) {
        window.location.href = 'login.html';
    }
    
    if (currentUser && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    // Tampilkan informasi user di dashboard
    if (currentUser && document.getElementById('userRole')) {
        document.getElementById('userRole').textContent = `${currentUser.name} (${currentUser.role})`;
        
        // Sembunyikan menu berdasarkan role
        if (currentUser.role === 'siswa') {
            document.querySelectorAll('.admin-only, .guru-only').forEach(el => {
                el.style.display = 'none';
            });
        } else if (currentUser.role === 'guru') {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'none';
            });
        }
    }
});