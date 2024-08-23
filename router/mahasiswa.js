const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller/index');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload =  multer({storage: storage});

router.get('/', controller.mahasiswa.getAll);
router.get('/search', controller.mahasiswa.getSearch);
router.get('/:nim', controller.mahasiswa.getOne);
router.post('/', controller.mahasiswa.post);
router.put('/:nim', controller.mahasiswa.put);
router.delete('/:nim', controller.mahasiswa.delete);


// router.get('/', (req, res, next) => {
//     var sql = "SELECT * FROM mahasiswa";
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"Get Method mahasiswa",
//             data: result
//         })
//     })
// })
// router.post('/', (req, res, next) => {
//     const nim = req.body.nim;
//     const nama = req.body.nama;
//     const jurusan = req.body.jurusan;
//     var sql = "INSERT INTO mahasiswa (nim, nama, jurusan) VALUES ('"+nim+"','"+nama+"','"+jurusan+"')";
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"Berhasil Tambah Data mahasiswa"
//         })
//     })
// })
// router.get('/search', (req, res, next) => {
//     const nim = req.query.nim;
//     var sql = "SELECT * FROM mahasiswa WHERE nim="+nim;
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         if(result.length > 0){
//             res.status(200).json({
//                 message:"Mahasiswa Ditemukan",
//                 data: result
//             })
//         }else{
//             res.status(200).json({
//                 message:"Mahasiswa tidak Ditemukan",
//                 data: result
//             })
//         }
//     })
// });

// router.put('/', (req, res, next) => {
//     const nim = req.body.nim;
//     const nama = req.body.nama;
//     const jurusan = req.body.jurusan;
//     var sql = "UPDATE mahasiswa SET nama = '"+nama+"', jurusan = '"+jurusan+"' WHERE nim ="+nim;
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"Berhasil Ubah Data mahasiswa"
//         })
//     })
// })

// router.delete('/:nim', (req, res, next) => {
//     const nim = req.params.nim;
//     var sql = "DELETE FROM mahasiswa WHERE nim ="+nim;
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"Berhasil Delete Data mahasiswa"
//         })
//     })
// })


module.exports = router;