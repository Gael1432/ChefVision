import { Sequelize } from "sequelize";
import db from "./connection.js"

export const UsuariosModel = db.define('USUARIOS', {
	Email: {
		type: Sequelize.STRING(100),
		// Permite nulos?
		allowNull: false,
		//funciones por defecto que seria agregar algun dato sin que el usuario haga nada por ejemplo se podria indicar la fecha en la que se creo dicho usuario sin que este lo tenga en cuenta
		defaultValue: Sequelize.NOW,
		// defaultValue: Sequelize.UUIDV4,

		//Unico => Esto valida si un usuario ya ha sido creado con el mismo correo
		//! unique: true,
		// Este es un mensaje personalizado para indicar que ya existe el usuario
		unique: { msg: 'Email ya existe' },
		
		// Auto-incrementable
		autoIncrement: true,

		//Validaciones: Esto lo hace unicamente la libreria Sequelize esto no se hace directamente en la base de datos
		validate: {
			isEmail: {
				msg:'Debe de ser un correo valido'
			},
			isAlphanumeric: true,
			notEmpty: {
				msg:'El correo no puede estar vacio'
			},
		},
		Password: {
			type: Sequelize.STRING(225),
			allowNull: false,
			validate: {
				len: {
					args: [8, 255],
					msg:'La contraseña debe tener al menos 8 caracteres'
				},
				notEmpty: {
					msg:'La contraseña no puede estar vacia'
				}
			}
		},
		Nombre: {
			type: Sequelize.STRING(50),
			allowNull: true,
		},
		Rol: {
			type: Sequelize.ENUM('Admin', 'Mesero', 'Cocina', 'Barra'),
			defaultValue:'Mesero'
		},
		Activo: {
			type: Sequelize.BOOLEAN,
			defaultValue:true
		},
		
	}	
})