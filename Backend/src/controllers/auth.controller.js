import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config';
import Role from '../models/Role';

export const signup = async (req, res) => {
    try {
      const {username,email,password, roles} = req.body;

      
      
      const newUser = new User({
        username,
        email,
        password : await User.encryptPassword(password)
      })

      if(roles){
        const foundRoles = await Role.find({name :{$in : roles}})
        newUser.roles = foundRoles.map(role => role._id)
      } else {
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
      }
      
      const savedUser = await newUser.save();
      console.log(savedUser)
      
      const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400//24Hs
      })
      res.cookie ('token', token)
      res.status(200).json({ message: 'Usuario registrado exitosamente' });

    } catch (error) {
      console.error("Error en signup:", error);
      res.status(500).json({ error: 'Error en el registro', details: error.message });
    }
  };


  export const signin = async (req, res) => {
    try {
      // Lógica de inicio de sesión aquí
      const userFound = await User.findOne({ email: req.body.email }).populate("roles");
  
      // Manejo de errores aquí
      if (!userFound) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  
      if (!matchPassword) {
        return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });
      }
  
      // Generar el token
      const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // 24 horas
      });
  
      // Establecer la cookie con el token
      res.cookie('token', token);
  
      // Respondemos con el mensaje de sesión iniciada exitosamente
      res.status(200).json({ message: 'Sesión iniciada exitosamente' });
    } catch (error) {
      console.error("Error en signin:", error);
      res.status(500).json({ error: 'Error en el inicio de sesión', details: error.message });
    }
  };

  export const signout = (req, res) => {
    res.cookie('token', '', {
      expires: new Date(0)
    });
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  };

  export const profile = async (req , res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json ({message : "User not found"});
    return res.json({

      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      roles: userFound.roles,

    })
    res.send ('profile')
  }

  