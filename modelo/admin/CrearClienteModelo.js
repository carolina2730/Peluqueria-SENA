const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');
 
class CrearClienteModelo {
      // funcion para crear nuevos clientes
  static async crearCliente(tipoD, numeroD, nombres, direccion, telefono, email, contrasena) {
    const query = 'INSERT INTO clientes (`tipodocumento`, `numerodocumento`, `nombres`, `direccion`, `telefono`, `correo`, `contrasena`) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contrasena, salto);

      return await dbService.query(query, [tipoD, numeroD, nombres, direccion, telefono, email, contra]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta cliente: ${err.message}`);
    }
  }//cerrar crear cliente

}

module.exports = CrearClienteModelo;
