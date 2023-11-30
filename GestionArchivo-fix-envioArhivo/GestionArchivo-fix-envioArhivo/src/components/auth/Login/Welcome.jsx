import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            token: token,
          },
          
        })
        .then(({ data }) => setName(data.nombre))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div className="welcome">
      <h3>{name ? `¡Felicitaciones ${name}!` : "Usuario o Contraseña"}</h3>
      <h2>
        {name ? "Te pudiste logear correctamente🎉" : "Incorrecto!!!"}
      </h2>
    </div>
  );
};

export default Welcome;