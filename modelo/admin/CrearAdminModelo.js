const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class CrearAdminModelo {
// funcion para crear nuevos admin
  static async crearAdmin(tipoD, numeroD, nom, dir, tel, email, contras, rol) {
    const query = 'INSERT INTO trabajadores (tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);
      rol = "Admin";

      return await dbService.query(query, [tipoD, numeroD, nom, dir, tel, email, contra, rol]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta Admin: ${err.message}`);
    }
  }//cerrar crear Admin
}

module.exports = CrearAdminModelo;