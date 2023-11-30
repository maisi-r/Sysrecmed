import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState("");
  
  const navigate = useNavigate();

  const { correo, contraseña } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (correo !== "" && contraseña !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (
          (correo === "Marianela" && contraseña === "Marianela") ||
          (correo === "Veronica" && contraseña === "Veronica") ||
          (correo === "Facundo" && contraseña === "Facundo")

        ) {
          setMensaje("");
          setUsuarioLogeado(correo);
          localStorage.setItem("isLoggedIn", "true");
          navigate("/archivos");
        } else {
          setMensaje("Correo o contraseña incorrecta");
        }
      }, 1500);
    }
  };

  return (
    <>
      <div className="login">
        <div className="base-container-login">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={onSubmit}>
            <div className="form-login">
              <div className="inputContainer">
                <div className="left">
                  <label htmlFor="correo">Correo</label>
                  <input
                    onChange={handleChange}
                    value={correo}
                    name="correo"
                    id="correo"
                    type="text"
                    placeholder="Usuario..."
                    autoComplete="off"
                  />
                </div>
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
                  />
                </svg>
              </div>
              <div className="inputContainer">
                <div className="left">
                  <label htmlFor="contraseña">Contraseña</label>
                  <input
                    onChange={handleChange}
                    value={contraseña}
                    name="contraseña"
                    id="contraseña"
                    type="password"
                    placeholder="Contraseña..."
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-key"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                  />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </div>
              <button type="submit">
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </div>
        {mensaje && <div className="pop">{mensaje}</div>}
      </div>
    </>
  );
};

export default Login;


