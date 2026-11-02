const db = require('../config/database');
const ProdukModel = {
    // Mengambil seluruh data produk secara asinkronus
    getAll: async () => {
        // db.query mengembalikan array: [rows, fields]
        const [rows] = await db.query('SELECT * FROM soto ORDER BY id DESC');
        return rows;
    },
    create: async (data) => {
        const sql = `
INSERT INTO soto ( nama_produk, harga)
VALUES ( ?, ?)
`;
        // Eksekusi query dengan parameter array terurut sesuai letak placeholder '?'
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.harga
        ]);
        return result;
    },
    // Mengambil 1 record spesifik berdasarkan Primary Key (id) 
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM soto WHERE id = ?', [id]);
        return rows[0]; // Mengembalikan objek tunggal atau undefined 
    },
    // Memperbarui record produk berdasarkan id 
    update: async (id, data) => {
        const sql = `
UPDATE soto
SET nama_produk = ?, harga = ?
WHERE id = ?
`;
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.harga,
            id
        ]);
        return result;
    },
    // Menghapus data produk berdasarkan id 
    delete: async (id) => {
        const sql = 'DELETE FROM soto WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByKategoriInsecure: async (kategoriInput) => {
        // Konkatenasi langsung (SANGAT RENTAN!)
        const rawSql = `SELECT * FROM soto WHERE kategori = '${kategoriInput}'`;
        console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
        const [rows] = await db.query(rawSql);
        return rows;
    },
    // METODE AMAN MENGGUNAKAN PREPARED STATEMENT 
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql = 'SELECT * FROM soto WHERE kategori = ?';
        console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows;
    }
};


module.exports = ProdukModel;