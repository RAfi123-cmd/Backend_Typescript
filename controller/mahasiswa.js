const { where, Model } = require('sequelize');
const model = require('../config/model/index')
const controller = {};
const {Op} = require('sequelize');
const db = require("../config/database/mysql");
const jurusan = require('../config/model/jurusan');

controller.getAll = async function(req, res) {
    try {
        let mahasiswa = await db.query('SELECT mahasiswa.nim as nimMahasiswa, mahasiswa.nama AS namaMahasiswa, mahasiswa.alamat AS alamat, mahasiswa.angkatan AS tahunAngkatan, mahasiswa.kd_jurusan askdJurusan, jurusan.nama_jurusan as namaJurusan FROM mahasiswa JOIN jurusan ON mahasiswa.kd_jurusan - jurusan.kd_jurusan ORDER BY mahasiswa.nim ASC')
            if(mahasiswa.length > 0) {
                res.status(200).json({
                    message: 'Data Semua Mahasiswa',
                    data: mahasiswa
                })
            }else{
                res.status(200).json({
                    message: 'Tidak ada data',
                    data:[]
                })
            }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getOne = async function (req, res) {
    try{
        let mahasiswa = await model.mahasiswa.findAll({
            where: {
                nim: req.params.nim
            }
        })
        if(mahasiswa.length > 0) {
            res.status(200).json({
                message: 'Mahasiswa Ditemukan',
                data: mahasiswa
            })
        }else{
            res.status(200).json({
                message: 'Tidak ada data',
                data:[]
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getSearch = async function(req, res) {
    const search = req.query.keyword;
    try {
        let mahasiswa = await model.mahasiswa.findAll({
            attributes: [['nim','nimMahasiswa'],['nama', 'namaMahasiswa'],['kd_jurusan', 'kodeJurusan'],['alamat', 'alamat'],['angkatan', 'tahunAngkatan']],
            where: {
                [Op.or]: [{
                    nim: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    nama: {
                        [Op.like]: '%' +search+ '%'
                    }
                }]
            },
            order: [['angkatan', 'asc']],
            limit:2
        })
            if(mahasiswa.length > 0) {
                res.status(200).json({
                    message: 'Data Semua Mahasiswa',
                    data: mahasiswa
                })
            }else{
                res.status(200).json({
                    message: 'Tidak ada data',
                    data:[]
                })
            }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.post = async function (req, res) {
    try {
        let mahasiswa = await model.mahasiswa.create({
            nim: req.body.nim,
            nama: req.body.nama,
            kd_jurusan: req.body.jurusan,
            alamat: req.body.alamat,
            angkatan: req.body.angkatan,
            foto: req.file.path
        })
        res.status(200).json({
            message: 'Berhasil Tambah Data Mahasiswa',
            data: mahasiswa
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.put = async function (req, res) {
    try {
        let mahasiswa = await model.mahasiswa.update({
            nama: req.body.nama,
            kd_jurusan: req.body.jurusan,
            alamat: req.body.alamat,
            angkatan: req.body.angkatan
        },{
            where: {
                nim: req.params.nim
            }
        })
        res.status(200).json({
            message: "Berhasil Ubah Data Mahasiswa",
            data: mahasiswa
        })       
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.delete = async function (req, res) {
    try {
        let mahasiswa = await model.mahasiswa.destroy({
            where: {
                nim: req.params.nim
            }
        })
        res.status(200).json({
            message: "Berhasil Hapus Data Mahasiswa",
            data: mahasiswa
        })   
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;