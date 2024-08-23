const express = require('express');
const app = express();
const mahasiswaRouter = require('./router/mahasiswa');
const axiosRoutes = require('./router/axios');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { error } = require('console');
const basicAuth = require('express-basic-auth');
const helmet = require('helmet');

app.use(helmet());

// app.use(basicAuth({
//     users: {'admin': "supersecret"},
//     unauthorizedResponse: basicAuthResponse
// }))

// function basicAuthResponse(req) {
//     return req.auth
//         ? ('Credentials' + req.auth.user + ':' + req.auth.password + 'rejected')
//         : 'Unauthorized'
// }


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/mahasiswa', mahasiswaRouter);
app.use('/axios', axiosRoutes);
app.use('/assets', express.static('assets'));

app.use((req, res, next) => {
    const error = new Error('Tidak ditemukan');
    error .status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;