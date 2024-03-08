import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import config from '../config';
import Role from '../models/Role';

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email already in use"]);
    }

    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10) // 10 es el número de salt rounds
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = await createAccessToken({ id: savedUser._id });

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false
    });
    res.status(200).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ error: 'Error en el registro', details: error.message });
  }
};

// export const signup = async (req, res) => {
//   const {username,email,password, roles} = req.body;  
  
//   try {
//     const userFound = await User.findOne({ email })
//     if(userFound)
//       return res.status(400).json(["The email already in use"])
    
//     const isMatch = await bcrypt.compare(password, userFound.password);
//     if(!isMatch) return res.status(400).json({message:"Incorrect password"});
    
//     const token = await createAccessToken ({id : userFound._id});

//     const newUser = new User({
//       username,
//       email,
//       password : await User.encryptPassword(password)
//     })

//     if(roles){
//       const foundRoles = await Role.find({name :{$in : roles}})
//       newUser.roles = foundRoles.map(role => role._id)
//     } else {
//       const role = await Role.findOne({name:"user"})
//       newUser.roles = [role._id]
//     }
    
//     const savedUser = await newUser.save();
//     console.log(savedUser)
    
//     // const token = jwt.sign({id: savedUser._id}, config.SECRET, {
//     //   expiresIn: 86400//24Hs
//     // })
//     res.cookie ('token', token , {
//       sameSite: 'none',
//       secure: true,
//       httpOnly: false
//     })
//     res.status(200).json({ message: 'Usuario registrado exitosamente' });

//   } catch (error) {
//     console.error("Error en signup:", error);
//     res.status(500).json({ error: 'Error en el registro', details: error.message });
//   }
// };

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
    res.cookie ("token", token)

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
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(401).json({message : "Unauthorized"});

  jwt.verify(token, config.SECRET, async (err, user) => {

    if (err) return res.status(401).json ({ message: "Unauthorized"});

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json ({ message: "Unauthorized"});

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })

  })   
}

// export const verifyToken = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.send(false);

//   jwt.verify(token, config.SECRET, async (error, user) => {
//     if (error) return res.sendStatus(401);

//     const userFound = await User.findById(user.id);
//     if (!userFound) return res.sendStatus(401);

//     return res.json({
//       id: userFound._id,
//       username: userFound.username,
//       email: userFound.email,
//     });
//   });
// };
