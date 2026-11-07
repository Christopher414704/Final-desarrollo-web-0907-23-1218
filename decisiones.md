# Decisiones del proyecto

## 1. Qué entendí del problema y qué tablas/modelos planeé

Entendí que el sistema debía permitir que un usuario iniciara sesión mediante una cookie y pudiera consultar salas disponibles y crear reservas indicando sala, fecha, hora de inicio y hora de fin. También debía impedir que una misma sala tuviera reservas con horarios solapados.

Para resolverlo se utilizaron tres modelos principales:

- Usuario: almacena nombre, correo y contraseña cifrada.
- Sala: almacena nombre y capacidad.
- Reserva: almacena fecha, hora de inicio, hora de fin y las relaciones con usuario y sala.

La base de datos se implementó en SQL Server utilizando Sequelize como ORM.

## 2. Qué partes se delegaron a la IA y por qué

Se utilizó inteligencia artificial como apoyo para definir la estructura inicial del proyecto, organizar los modelos, crear las rutas del backend, configurar las sesiones mediante cookies y orientar la creación del frontend en React.

También se utilizó para explicar errores encontrados durante el desarrollo y proponer correcciones de manera más rápida.

## 3. Algo que la IA hizo mal o que tuve que corregir

Inicialmente se planteó utilizar PostgreSQL como base de datos, pero durante el desarrollo se decidió cambiar a SQL Server porque era más conveniente para el entorno disponible.

También hubo que corregir el orden de configuración de las sesiones en el backend, ya que la ruta de login intentaba utilizar `req.session` antes de que `express-session` estuviera configurado. Esto se detectó porque el backend devolvía un error 500 y la consola mostraba que `req.session` era undefined.