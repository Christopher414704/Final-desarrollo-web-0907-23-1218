import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Reservas from './pages/Reservas';
import { api } from './api';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    verificarSesion();
  }, []);

  async function verificarSesion() {
    try {
      const datos = await api('/api/auth/sesion');

      setUsuario(datos.usuario);

    } catch {
      setUsuario(null);

    } finally {
      setCargando(false);
    }
  }

  if (cargando) {
    return (
      <div className="loading">
        Cargando...
      </div>
    );
  }

  if (!usuario) {
    return (
      <Login
        onLogin={setUsuario}
      />
    );
  }

  return (
    <Reservas
      usuario={usuario}
      onLogout={() => setUsuario(null)}
      onUnauthorized={() => setUsuario(null)}
    />
  );
}

export default App;