import { useState } from 'react';
import { api } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('usuario@biblioteca.com');
  const [password, setPassword] = useState('123456');
  const [mensaje, setMensaje] = useState('');

  async function iniciarSesion(e) {
    e.preventDefault();
    setMensaje('');

    try {
      const datos = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });

      onLogin(datos.usuario);

    } catch (error) {
      setMensaje(error.message);
    }
  }

  return (
    <div className="login-container">
      <form className="card login-card" onSubmit={iniciarSesion}>

        <h1>Biblioteca</h1>
        <p>Inicia sesión para reservar una sala</p>

        <label>Correo</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mensaje && (
          <p className="error">{mensaje}</p>
        )}

        <button type="submit">
          Iniciar sesión
        </button>

      </form>
    </div>
  );
}

export default Login;