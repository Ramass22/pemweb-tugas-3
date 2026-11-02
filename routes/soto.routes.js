const express = require('express');
const router = express.Router();
const produkController = require('../controllers/soto.controller');
const ProdukModel = require('../models/soto.models')
router.get('/', produkController.getDaftarProduk);
router.get('/menu-tambah', produkController.getFormTambah);
router.post('/menu-tambah', produkController.postTambahProduk);
router.get('/edit/:id', produkController.getFormEdit);
router.post('/edit/:id', produkController.postUpdateProduk);
router.post('/hapus/:id', produkController.postHapusProduk);
module.exports = router