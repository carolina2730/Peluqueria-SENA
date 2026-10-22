const express = require('express');
const CRutas = require('../../controlador/clientes/CrearClienteControlador');
const LRutas = require('../../controlador/clientes/LoginClienteControlador');



const router = express.Router();

router.post('/usuarios/crear', CRutas.crearCliente);//fr01
router.post('/usuarios/login', LRutas.validarCredenciales);//fr03



module.exports = router;