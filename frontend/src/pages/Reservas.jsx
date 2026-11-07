import { useEffect, useState } from 'react';
import { api } from '../api';

function Reservas({ usuario, onLogout, onUnauthorized }) {
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);

  const [salaId, setSalaId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  async function cargarDatos() {
    try {
      const datosSalas = await api('/api/salas');
      const datosReservas = await api('/api/reservas');

      setSalas(datosSalas);
      setReservas(datosReservas);

      if (datosSalas.length > 0) {
        setSalaId((actual) => actual || datosSalas[0].id);
      }

    } catch (error) {
      if (error.status === 401) {
        onUnauthorized();
        return;
      }

      setError(error.message);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function crearReserva(e) {
    e.preventDefault();

    setMensaje('');
    setError('');

    try {
      const datos = await api('/api/reservas', {
        method: 'POST',
        body: JSON.stringify({
          salaId: Number(salaId),
          fecha,
          horaInicio,
          horaFin
        })
      });

      setMensaje(datos.mensaje);

      setFecha('');
      setHoraInicio('');
      setHoraFin('');

      await cargarDatos();

    } catch (error) {
      if (error.status === 401) {
        onUnauthorized();
        return;
      }

      setError(error.message);
    }
  }

  async function cerrarSesion() {
    try {
      await api('/api/auth/logout', {
        method: 'POST'
      });
    } catch {
      // Regresamos al login aunque falle la petición.
    }

    onLogout();
  }

  return (
    <div className="container">

      <header className="header">
        <div>
          <h1>Reservas de Biblioteca</h1>
          <p>Bienvenido, {usuario.nombre}</p>
        </div>

        <button
          className="secondary"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </header>

      <div className="grid">

        <section className="card">

          <h2>Nueva reserva</h2>

          <form onSubmit={crearReserva}>

            <label>Sala</label>

            <select
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
              required
            >
              {salas.map((sala) => (
                <option
                  key={sala.id}
                  value={sala.id}
                >
                  {sala.nombre} - Capacidad {sala.capacidad}
                </option>
              ))}
            </select>

            <label>Fecha</label>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />

            <label>Hora inicio</label>

            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />

            <label>Hora fin</label>

            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              required
            />

            {mensaje && (
              <p className="success">{mensaje}</p>
            )}

            {error && (
              <p className="error">{error}</p>
            )}

            <button type="submit">
              Reservar sala
            </button>

          </form>

        </section>

        <section className="card">

          <h2>Salas</h2>

          <div className="salas">

            {salas.map((sala) => (
              <div
                className="sala"
                key={sala.id}
              >
                <strong>{sala.nombre}</strong>
                <span>Capacidad: {sala.capacidad}</span>
              </div>
            ))}

          </div>

        </section>

      </div>

      <section className="card reservas">

        <h2>Mis reservas</h2>

        {reservas.length === 0 ? (
          <p>No tienes reservas registradas.</p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Sala</th>
                <th>Fecha</th>
                <th>Inicio</th>
                <th>Fin</th>
              </tr>
            </thead>

            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>

                  <td>{reserva.Sala?.nombre}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.horaInicio}</td>
                  <td>{reserva.horaFin}</td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </section>

    </div>
  );
}

export default Reservas;