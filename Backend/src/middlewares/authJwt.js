import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';
import Role from "../models/Role.js";


export const verifyToken = async (req, res, next) => {
  try {
      const token = req.cookies.token; // Aquí se obtiene el token de las cookies

      if (!token) return res.status(403).json({ message: "No token provided" });

      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;

      // Aquí puedes agregar lógica adicional si es necesario
      // Por ejemplo, puedes buscar el usuario en la base de datos usando req.userId
      // y almacenarlo en req.user si es necesario para otras rutas.

      // Ejemplo de búsqueda de usuario en la base de datos
      const user = await User.findById(req.userId, { password: 0 });

      if (!user) return res.status(404).json({ message: "No user found" });

      // Almacenar el usuario en req.user si es necesario para otras rutas
      req.user = user;

      next();
  } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };