const modelo = require('../../modelo/admin/CrearClienteModelo');
class CrearClienteControlador {
     // funcion crear nuevo cliente
    static async crearCliente(req, res) {
        const { t1: tipoD, t2: numeroD, t3: nombres, t4: direccion, t5: telefono, t6: email, t7: contrasena } = req.body;
        // ------------👁️‍🗨️ validaciones👁️‍🗨️----------------
        // Validar campos vacíos❓❓❓❓❓----------------
        const errorCampos = CrearClienteControlador.verCampos(tipoD, numeroD, nombres, direccion, telefono, email, contrasena);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
        // Validar tipo documento❓❓❓❓❓❓-------------------
        const errortipoD = CrearClienteControlador.vertipoD(tipoD);
        if (errortipoD) {
            return res.status(400).json({ error: errortipoD });
        }
           // Validar documento❓❓❓❓❓❓-------------------
        const erorIde = CrearClienteControlador.verIde(numeroD);
        if (erorIde) {
            return res.status(400).json({ error: erorIde });
        }
        // Validar nombres completos ❓❓❓❓❓❓❓------------
        const errornombres = CrearClienteControlador.vernombres(nombres);
        if (errornombres) {
            return res.status(400).json({ error: errornombres });
        }
        // Validar dirección❓❓❓❓❓❓-----------------------
        const errordir = CrearClienteControlador.verdir(direccion);
        if (errordir) {
            return res.status(400).json({ error: errordir });
        }
        // Validar teléfono❓❓❓❓❓❓❓-----------------------
        const errortel = CrearClienteControlador.verTel(telefono);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }
        // Validar correo❓❓❓❓❓❓❓--------------------------
        const errorem = CrearClienteControlador.veremail(email);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }
        // Validar contraseña❓❓❓❓❓❓-----------------------
        const errorkey = CrearClienteControlador.verkey(contrasena);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }

         try {
            const result = await modelo.CrearClientes(tipoD,numeroD, nombres, telefono, email, contrasena);
            res.status(201).json({ mensaje: 'cliente creado con exito', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'intenta recuperar la cuenta o inicia sesión.' }); 
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
        // ------------👁️‍🗨️ fin validaciones👁️‍🗨️------------
        
    }//cerrar crearcliente-------------------------------

         //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
    //-------------------validaciones----------------------------
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊

    static verCampos(tipoD, numeroD, nombres, direccion, telefono, email, contrasena) {
        if (!tipoD || !numeroD || !nombres || !direccion || !telefono || !email || !contrasena) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontro campos vacios
    }//cerrar verCampos


    //verificar tipo de documento
    static vertipoD(tipoD) {
        const tip = /^[A-Z\s]{2,3}$/;
        if (!tip.test(tipoD)) {
            return 'tipo de documento invalidos minimo 2 caracteres o maximo 3 CC, TI, RC, CE';
        } else {
            return null;
        }
    }
           //validar documento
    static verIde(numeroD) {
        if (!/^\d{8,10}$/.test(numeroD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        } else {
            return null; // Todo bien
        }
    }
   //verificar nombres completos
    static vernombres(nombres) {
        const name = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!name.test(nombres)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }

    static verdir(direccion) {
        //expresion regular que permite:
        // Letras (mayúsculas y minúsculas)
        // Números (0-9)
        // Espacios en blanco
        // Caracteres especiales comunes en direcciones: . , - # /
        //longitud minima de 5 caracteres y maximo 200
        const dirregex = /^[A-Za-z0-9\s.,\-#\/]{5,200}$/;
        if (!dirregex.test(direccion)) {
            return 'Dirección invalida, longitud minima de 5 caracteres y maximo 200. Solo letras, números, espacios y caracteres especiales . , - # /';
        } else {
            return null;
        }
    }

      //verificar telefono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; // todo bien
        }
    }

     //validar correo
    static veremail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 250) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }//cerrar veremail

      //verificar contraseña
    static verkey(contrasena) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contrasena)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        } else {
            return null;
        }
    }
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
}

module.exports = CrearClienteControlador;