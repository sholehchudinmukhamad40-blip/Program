// Fungsi untuk menangani navigasi
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContent = document.getElementById('pageContent');
    
    // Load halaman berdasarkan data-page
    function loadPage(page) {
        // Hapus class active dari semua link
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Tambah class active ke link yang diklik
        event.target.classList.add('active');
        
        // Load konten berdasarkan halaman
        switch(page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'siswa':
                loadSiswa();
                break;
            case 'pelanggaran':
                loadPelanggaran();
                break;
            case 'tambah-point':
                loadTambahPoint();
                break;
            case 'bk':
                loadBK();
                break;
            case 'laporan':
                loadLaporan();
                break;
            case 'pengguna':
                loadPengguna();
                break;
            default:
                loadDashboard();
        }
    }
    
    // Tambah event listener ke semua nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
    
    // Fungsi untuk memuat halaman dashboard
    function loadDashboard() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        let dashboardHTML = `
            <div class="dashboard-header">
                <h2>Dashboard</h2>
                <p>Selamat datang, ${currentUser.name}</p>
            </div>
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Total Siswa</h3>
                    <p class="stat-number">150</p>
                </div>
                <div class="stat-card">
                    <h3>Pelanggaran Hari Ini</h3>
                    <p class="stat-number">12</p>
                </div>
                <div class="stat-card">
                    <h3>Siswa Tahap Peringatan</h3>
                    <p class="stat-number">8</p>
                </div>
                <div class="stat-card">
                    <h3>Siswa Tahap Lanjut</h3>
                    <p class="stat-number">3</p>
                </div>
            </div>
            <div class="recent-activity">
                <h3>Aktivitas Terbaru</h3>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nama Siswa</th>
                                <th>Pelanggaran</th>
                                <th>Point</th>
                                <th>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Andi Pratama</td>
                                <td>Terlambat masuk kelas</td>
                                <td>5</td>
                                <td>15 Mar 2023</td>
                            </tr>
                            <tr>
                                <td>Siti Rahayu</td>
                                <td>Tidak mengerjakan PR</td>
                                <td>10</td>
                                <td>14 Mar 2023</td>
                            </tr>
                            <tr>
                                <td>Budi Santoso</td>
                                <td>Membuat keributan di kelas</td>
                                <td>15</td>
                                <td>13 Mar 2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        pageContent.innerHTML = dashboardHTML;
    }
    
    // Fungsi untuk memuat halaman data siswa
    function loadSiswa() {
        pageContent.innerHTML = `
            <div class="page-header">
                <h2>Data Siswa</h2>
                <button class="btn-primary" id="tambahSiswaBtn">Tambah Siswa</button>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>NIS</th>
                            <th>Nama</th>
                            <th>Kelas</th>
                            <th>Wali Kelas</th>
                            <th>Total Point</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2023001</td>
                            <td>Andi Pratama</td>
                            <td>X IPA 1</td>
                            <td>Bu Sari</td>
                            <td>15</td>
                            <td><span class="status-aman">Tahap Aman</span></td>
                            <td>
                                <button class="btn-secondary">Detail</button>
                                <button class="btn-primary">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2023002</td>
                            <td>Siti Rahayu</td>
                            <td>X IPA 2</td>
                            <td>Pak Budi</td>
                            <td>35</td>
                            <td><span class="status-peringatan">Tahap Peringatan</span></td>
                            <td>
                                <button class="btn-secondary">Detail</button>
                                <button class="btn-primary">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2023003</td>
                            <td>Budi Santoso</td>
                            <td>X IPA 3</td>
                            <td>Bu Rina</td>
                            <td>65</td>
                            <td><span class="status-lanjut">Tahap Lanjut</span></td>
                            <td>
                                <button class="btn-secondary">Detail</button>
                                <button class="btn-primary">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Fungsi untuk memuat halaman tambah point
    function loadTambahPoint() {
        pageContent.innerHTML = `
            <div class="page-header">
                <h2>Tambah Point Pelanggaran</h2>
            </div>
            <div class="form-container">
                <form id="formTambahPoint">
                    <div class="form-group">
                        <label for="siswa">Pilih Siswa</label>
                        <select id="siswa" name="siswa" required>
                            <option value="">-- Pilih Siswa --</option>
                            <option value="1">Andi Pratama (X IPA 1)</option>
                            <option value="2">Siti Rahayu (X IPA 2)</option>
                            <option value="3">Budi Santoso (X IPA 3)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tipePelanggaran">Tipe Pelanggaran</label>
                        <select id="tipePelanggaran" name="tipePelanggaran" required>
                            <option value="">-- Pilih Tipe --</option>
                            <option value="ringan">Ringan</option>
                            <option value="sedang">Sedang</option>
                            <option value="berat">Berat</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="jenisPelanggaran">Jenis Pelanggaran</label>
                        <select id="jenisPelanggaran" name="jenisPelanggaran" required>
                            <option value="">-- Pilih Jenis --</option>
                            <option value="terlambat">Terlambat Masuk Kelas</option>
                            <option value="seragam">Tidak Memakai Seragam</option>
                            <option value="pr">Tidak Mengerjakan PR</option>
                            <option value="keributan">Membuat Keributan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pointPelanggaran">Point Pelanggaran</label>
                        <input type="number" id="pointPelanggaran" name="pointPelanggaran" required>
                    </div>
                    <div class="form-group">
                        <label for="tanggalPelanggaran">Tanggal Pelanggaran</label>
                        <input type="date" id="tanggalPelanggaran" name="tanggalPelanggaran" required>
                    </div>
                    <div class="form-group">
                        <label for="keterangan">Keterangan</label>
                        <textarea id="keterangan" name="keterangan" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Simpan Point</button>
                </form>
            </div>
        `;
        
        // Set tanggal default ke hari ini
        document.getElementById('tanggalPelanggaran').valueAsDate = new Date();
    }
    
    // Fungsi untuk memuat halaman BK
    function loadBK() {
        pageContent.innerHTML = `
            <div class="page-header">
                <h2>Tindakan BK & Kesiswaan</h2>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Siswa dengan Point Tinggi</h3>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nama Siswa</th>
                                <th>Kelas</th>
                                <th>Total Point</th>
                                <th>Status</th>
                                <th>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Budi Santoso</td>
                                <td>X IPA 3</td>
                                <td>65</td>
                                <td><span class="status-lanjut">Tahap Lanjut</span></td>
                                <td>
                                    <button class="btn-primary">Panggil Orang Tua</button>
                                    <button class="btn-secondary">Buat Surat Peringatan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Rina Andriani</td>
                                <td>XI IPS 1</td>
                                <td>58</td>
                                <td><span class="status-peringatan">Tahap Peringatan</span></td>
                                <td>
                                    <button class="btn-primary">Panggil Orang Tua</button>
                                    <button class="btn-secondary">Buat Surat Peringatan</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Form Panggilan Orang Tua</h3>
                </div>
                <div class="form-container">
                    <form id="formPanggilan">
                        <div class="form-group">
                            <label for="siswaPanggilan">Pilih Siswa</label>
                            <select id="siswaPanggilan" name="siswaPanggilan" required>
                                <option value="">-- Pilih Siswa --</option>
                                <option value="1">Budi Santoso (X IPA 3)</option>
                                <option value="2">Rina Andriani (XI IPS 1)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="tanggalPanggilan">Tanggal Panggilan</label>
                            <input type="datetime-local" id="tanggalPanggilan" name="tanggalPanggilan" required>
                        </div>
                        <div class="form-group">
                            <label for="alasanPanggilan">Alasan Panggilan</label>
                            <textarea id="alasanPanggilan" name="alasanPanggilan" rows="4" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="tindakan">Tindakan yang Akan Dilakukan</label>
                            <textarea id="tindakan" name="tindakan" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Buat Panggilan</button>
                    </form>
                </div>
            </div>
        `;
    }
    
    // Load dashboard secara default
    loadDashboard();
});