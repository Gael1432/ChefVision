import User from '../Models/userModel.js';
import db from '../Models/connection.js';

const registrarUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const nuevoUsuario = await User.create({
      username,
      email,
      password
    });
    
    console.log('✅ Usuario creado:', nuevoUsuario.username);
    
    res.render('success', {
      title: 'Registro Exitoso',
      username: nuevoUsuario.username,
      email: nuevoUsuario.email
    });
    
  } catch (error) {
    console.error('❌ Error al registrar:', error.name);
    
    let mensajeError = 'Error al registrar usuario';
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      const campo = error.errors[0].path;
      mensajeError = `El ${campo} ya está registrado`;
    } else if (error.name === 'SequelizeValidationError') {
      mensajeError = error.errors.map(e => e.message).join('. ');
    }
    
    res.render('register', {
      title: 'Registro de Usuario',
      error: mensajeError
    });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await User.findOne({ where: { email } });
    
    if (!usuario) {
      return res.render('login', {
        title: 'Iniciar Sesión',
        error: 'Usuario o contraseña incorrectos'
      });
    }
    
    const passwordValido = await usuario.validPassword(password);
    
    if (!passwordValido) {
      return res.render('login', {
        title: 'Iniciar Sesión',
        error: 'Usuario o contraseña incorrectos'
      });
    }
    
    res.render('dashboard', {
      title: 'Dashboard',
      username: usuario.username
    });
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.render('login', {
      title: 'Iniciar Sesión',
      error: 'Error al iniciar sesión'
    });
  }
};

export {
  registrarUsuario,
  loginUsuario
};