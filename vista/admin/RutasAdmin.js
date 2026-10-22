const express = require('express');
const CRutas = require('../../controlador/admin/CrearClienteControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');


const router = express.Router();

router.post('/seguridad/crearcliente', CRutas.crearCliente);//rf01
router.post('/seguridad/crearadmin', ARutas.crearAdmin);
router.post('/seguridad/login', LRutas.validarCredenciales);
router.post('/seguridad/creartrabajador', TRutas.crearTrabajador);//rf04


module.exports = router;