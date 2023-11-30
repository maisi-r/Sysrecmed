import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPage({ userData }) {
  return (
    <div>
      <h1>Bienvenido, {userData.username}</h1>
      <p>Tu email es: {userData.email}</p>
    </div>
  );
}

function AdminPage({ users }) {
  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Enviamos una solicitud POST a la API para iniciar sesión
      const response = await axios.post('https://my-api.com/login', {
        username,
        password
      });

      // Guardamos el token de autenticación en el localStorage
      localStorage.setItem('token', response.data.token);

      // Llamamos a la función onLogin para actualizar el estado de la aplicación
      onLogin();
    } catch (error) {
      // Si la solicitud falló, mostramos un mensaje de error al usuario
      setError('Nombre de usuario o contraseña incorrectos');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}

function Logineo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Comprobamos si el usuario está autenticado y si tiene permisos de administrador
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);

      // Enviamos una solicitud GET a la API para comprobar si el usuario es un administrador
      async function checkAdminStatus() {
        try {
          const response = await axios.get('https://my-api.com/admin', {
            headers: { Authorization: `Bearer ${token}` }
          });

          setIsAdmin(true);
        } catch (error) {
          setIsAdmin(false);
        }
      }

      checkAdminStatus();

      // Enviamos una solicitud GET a la API para obtener los datos del usuario actual
      async function getUserData() {
        try {
          const response = await axios.get('http://138.117.77.156:3007/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });

          setUserData(response.data);
          setLoading(false);
        } catch (error) {
            setError('Error al cargar los datos del usuario');
          }
        }
  
        getUserData();
  
        // Si el usuario es un administrador, enviamos una solicitud GET a la API para obtener la lista de usuarios
        if (isAdmin) {
          async function getUsers() {
            try {
              const response = await axios.get('https://my-api.com/users', {
                headers: { Authorization: `Bearer ${token}` }
              });
  
              setUsers(response.data);
              setLoading(false);
            } catch (error) {
              setError('Error al cargar la lista de usuarios');
            }
          }
  
          getUsers();
        }
      } else {
        setLoading(false);
      }
    }, []);
  
    function handleLogout() {
      // Eliminamos el token de autenticación del localStorage y actualizamos el estado de la aplicación
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserData(null);
      setUsers([]);
    }
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />;
    }
  
    if (isAdmin) {
      return (
        <div>
          <AdminPage users={users} />
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      );
    }
  
    return (
      <div>
        <UserPage userData={userData} />
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }
  
  export default Logineo;
  
