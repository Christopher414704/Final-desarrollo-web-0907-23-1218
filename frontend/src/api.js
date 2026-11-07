const API_URL = 'http://localhost:3000';

export async function api(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers
    }
  });

  let datos = {};

  try {
    datos = await respuesta.json();
  } catch {
    datos = {};
  }

  if (respuesta.status === 401) {
    const error = new Error(datos.mensaje || 'Sesión expirada');
    error.status = 401;
    throw error;
  }

  if (!respuesta.ok) {
    const error = new Error(
      datos.mensaje || 'Error en la solicitud'
    );

    error.status = respuesta.status;
    throw error;
  }

  return datos;
}