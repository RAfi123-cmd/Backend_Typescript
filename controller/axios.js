const axios = require('axios');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        if(response.data.length > 0) {
            res.status(200).json({
                message: 'Data dari Public API',
                data: response.data
            })
        }else{
            res.status(200).json({
                message: 'Tidak ada data',
                data:[]
            })
        }   
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.post = async function (req, res) {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
                title: req.body.title,
                body: req.body.body,
                userId: 1
            }
        });
        res.status(200).json({
            message: 'Berhasil Tambah Data',
            data: response.data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.put = async function (req, res) {
    try {
        var id = req.params.id
        const response = await axios({
            method: 'put',
            url: 'https://jsonplaceholder.typicode.com/posts/'+id,
            data: {
                title: req.body.title,
                body: req.body.body,
                userId: 1
            }
        });
        res.status(200).json({
            message: 'Berhasil Edit Data',
            data: response.data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.delete = async function (req, res) {
    try {
        var id = req.params.id
        const response = await axios({
            method: 'delete',
            url: 'https://jsonplaceholder.typicode.com/posts/'+id,
        });
        res.status(200).json({
            message: 'Berhasil Hapus Data',
            data: response.data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
module.exports = controller;