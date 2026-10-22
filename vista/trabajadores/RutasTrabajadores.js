const express = require('express');
const LTRutas = require('../../controlador/trabajadores/LoginTrabajadorControlador');


const router = express.Router();

router.post('/trabajador/login', LTRutas.validarCredenciales);//fr03



module.exports = router; 