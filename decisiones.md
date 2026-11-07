# Decisiones del proyecto

## 1. Qué entendí del problema y qué tablas/modelos planeé

Entendí que debía desarrollar una aplicación web para gestionar reservas de salas de una biblioteca. El usuario debe iniciar sesión y mantener su autenticación mediante una sesión almacenada en una cookie. Una vez autenticado puede consultar las salas disponibles, seleccionar una sala y registrar una reserva indicando fecha, hora de inicio y hora de finalización.

También entendí que una de las reglas principales del sistema era impedir que una misma sala tuviera dos reservas con horarios que se cruzaran. Por ejemplo, si una sala está reservada de 09:00 a 10:00, otra persona no puede reservarla de 09:30 a 10:30. Sin embargo, sí se permite realizar una nueva reserva que comience exactamente a las 10:00.

Para desarrollar la aplicación se decidió utilizar Node.js con Express para el backend, Sequelize como ORM, SQL Server como sistema de base de datos y React con Vite para el frontend.

Se planearon tres modelos principales:

### Usuario

El modelo Usuario representa a las personas que pueden iniciar sesión en el sistema.

Sus campos principales son:

- id
- nombre
- email
- password

El correo se definió como único para evitar usuarios duplicados. La contraseña no se almacena directamente, sino que se cifra utilizando bcryptjs antes de guardarla en la base de datos.

### Sala

El modelo Sala representa los espacios de la biblioteca que pueden ser reservados.

Sus campos principales son:

- id
- nombre
- capacidad

Se crearon varias salas iniciales para poder probar la aplicación.

### Reserva

El modelo Reserva representa una reservación realizada por un usuario.

Sus campos principales son:

- id
- fecha
- horaInicio
- horaFin
- usuarioId
- salaId

Cada reserva pertenece a un usuario y a una sala.

Por medio de Sequelize se establecieron las relaciones:

- Un usuario puede tener muchas reservas.
- Una reserva pertenece a un usuario.
- Una sala puede tener muchas reservas.
- Una reserva pertenece a una sala.

También se decidió separar el proyecto en dos carpetas principales:

- backend
- frontend

Esto permite mantener separada la lógica del servidor de la interfaz gráfica.

## 2. Decisiones relacionadas con la base de datos

Inicialmente se consideró utilizar PostgreSQL porque Sequelize tiene muy buen soporte para ese motor de base de datos. Durante la configuración se presentó el inconveniente de no conocer la contraseña del usuario principal de PostgreSQL.

Por esa razón se decidió cambiar la base de datos a SQL Server, ya que SQL Server ya estaba instalado y configurado en el equipo.

Se utilizó la instancia:

localhost\SQL2026

Para permitir que Node.js se conectara a SQL Server se instaló el paquete `tedious`, que funciona como controlador para Sequelize cuando se utiliza el dialecto MSSQL.

También fue necesario habilitar:

- SQL Server Authentication.
- TCP/IP.
- SQL Server Browser.

Después de estas configuraciones Sequelize pudo conectarse correctamente a SQL Server.

La base utilizada se llamó:

BibliotecaReservas

Las tablas fueron creadas automáticamente mediante Sequelize usando `sequelize.sync()`, en lugar de crear las tablas manualmente desde SQL Server.

## 3. Decisiones relacionadas con la autenticación

Se utilizó `express-session` para manejar las sesiones del usuario.

Cuando el usuario inicia sesión correctamente, el backend guarda información como:

- usuarioId
- nombre
- email

dentro de `req.session`.

La cookie de sesión se configuró con una duración de 30 minutos.

También se utilizó:

`rolling: true`

Esto permite que los 30 minutos vuelvan a comenzar cada vez que el usuario realiza una petición válida al servidor. De esta forma la sesión realmente expira después de 30 minutos de inactividad.

Se configuró además:

`httpOnly: true`

para evitar que JavaScript del navegador pueda acceder directamente a la cookie.

En el frontend se utilizó:

`credentials: 'include'`

para que las peticiones realizadas con `fetch` incluyan la cookie de sesión.

## 4. Decisiones para proteger las rutas

Se creó un middleware llamado `auth.js`.

Su función es comprobar si existe:

`req.session.usuarioId`

Si no existe, el backend responde con:

`401 Unauthorized`

De esta forma las rutas de salas y reservas solamente pueden utilizarse cuando existe una sesión válida.

En React se creó una función central para realizar las peticiones al backend. Esta función revisa si la respuesta es un código 401.

Cuando eso ocurre el frontend elimina el usuario actual del estado y vuelve a mostrar automáticamente la pantalla de login.

Esto permite cumplir con el requisito de redirigir al login cuando la sesión ya no es válida.

## 5. Decisión para evitar reservas solapadas

Una de las partes más importantes fue definir la lógica que evita que una sala tenga dos reservas con horarios cruzados.

Antes de crear una reserva se busca si existe otra reserva de la misma sala, en la misma fecha, que cumpla:

- La hora de inicio existente sea menor que la nueva hora de finalización.
- La hora de finalización existente sea mayor que la nueva hora de inicio.

La condición utilizada fue equivalente a:

`horaInicioExistente < nuevaHoraFin`

y:

`horaFinExistente > nuevaHoraInicio`

Si ambas condiciones se cumplen significa que existe un cruce de horarios.

En ese caso el backend devuelve:

`409 Conflict`

con el mensaje:

`La sala ya está reservada en ese horario`

Esta lógica se probó utilizando diferentes horarios.

Por ejemplo:

Reserva existente:

09:00 - 10:00

Nueva reserva:

09:30 - 10:30

Resultado:

Reserva rechazada por solapamiento.

También se probó:

10:00 - 11:00

y esta reserva fue permitida porque comienza exactamente cuando termina la reserva anterior.

## 6. Datos utilizados para las pruebas

Se creó un archivo `seed.js` para insertar datos iniciales.

Este archivo crea un usuario de prueba:

Correo:

usuario@biblioteca.com

Contraseña:

123456

La contraseña se cifra con bcryptjs antes de almacenarse en SQL Server.

También se crearon salas iniciales como:

- Sala de Estudio 1
- Sala de Estudio 2
- Sala Multimedia
- Sala de Reuniones

El uso de `findOrCreate` evita que los mismos datos se inserten nuevamente cada vez que se ejecuta el seed.

## 7. Qué partes se delegaron a la inteligencia artificial y por qué

La inteligencia artificial se utilizó principalmente como apoyo durante el proceso de desarrollo.

Se delegaron tareas como:

- Proponer la estructura inicial de carpetas.
- Explicar cómo utilizar Sequelize.
- Orientar la creación de los modelos.
- Crear ejemplos de rutas con Express.
- Explicar cómo utilizar bcryptjs.
- Configurar sesiones mediante cookies.
- Crear el middleware de autenticación.
- Proponer la validación para horarios solapados.
- Explicar errores encontrados durante la ejecución.
- Crear una estructura básica del frontend en React.
- Crear una función central para consumir la API.
- Explicar cómo detectar respuestas 401.
- Orientar el uso de Git y los commits.

La IA se utilizó como una herramienta de apoyo y explicación. Cada parte fue ejecutada, revisada y probada manualmente durante el desarrollo.

## 8. Cosas que la IA hizo mal o que fue necesario corregir

Durante el desarrollo hubo varias situaciones donde la primera solución propuesta tuvo que modificarse.

### Cambio de PostgreSQL a SQL Server

Al inicio se propuso utilizar PostgreSQL.

Sin embargo, durante la configuración se detectó que no se conocía la contraseña de PostgreSQL y que SQL Server ya estaba disponible en el equipo.

Se decidió cambiar a SQL Server y reemplazar los paquetes relacionados con PostgreSQL por `tedious`.

Esto demostró que una decisión inicial puede cambiar dependiendo del entorno real donde se desarrolla la aplicación.

### Problema de conexión con SQL Server

Inicialmente Node.js no lograba conectarse a:

localhost\SQL2026

El error era un timeout.

Después de revisar SQL Server Configuration Manager se descubrió que TCP/IP estaba habilitado, pero SQL Server Browser estaba deshabilitado.

Se cambió el servicio SQL Server Browser para permitir su ejecución y posteriormente la conexión con Sequelize funcionó correctamente.

### Error con la sesión

Durante la primera prueba del login el backend devolvía un error 500.

La consola mostró:

`Cannot set properties of undefined (setting 'usuarioId')`

El error estaba en:

`req.session.usuarioId = usuario.id`

Se descubrió que las rutas de autenticación se estaban utilizando antes de configurar correctamente `express-session`.

La solución fue colocar:

`app.use(session(...))`

antes de:

`app.use('/api/auth', authRoutes)`

Después de esta corrección el login respondió correctamente con código 200 y creó la cookie de sesión.

### Problema al inicializar Git

En una etapa se ejecutó `git init` accidentalmente desde el Escritorio de Windows y no desde la carpeta del proyecto.

Después se ejecutó:

`git add .`

Git intentó agregar archivos de todo el Escritorio, incluyendo otros proyectos y documentos.

Esto produjo incluso un error de nombre de archivo demasiado largo.

Se detectó porque `git status` mostraba archivos que no pertenecían al proyecto.

La solución fue eliminar únicamente la carpeta `.git` creada accidentalmente en el Escritorio, entrar a:

`Parcial Final Desarrollo`

y ejecutar nuevamente:

`git init`

De esta forma el repositorio quedó correctamente limitado al proyecto.

### Error en el frontend

Después de crear React con Vite, inicialmente se mostró solamente una pantalla blanca.

Al revisar la consola del navegador apareció:

`The requested module '/src/api.js' does not provide an export named 'api'`

Se comprobó que `Login.jsx` intentaba importar:

`import { api } from '../api'`

pero `api.js` no estaba exportando correctamente la función.

La solución fue declarar:

`export async function api(...)`

Después de corregirlo la interfaz cargó correctamente.

## 9. Pruebas realizadas

Durante el desarrollo se hicieron pruebas tanto en Postman como en el navegador.

Se verificó:

- Login correcto.
- Login con sesión mediante cookie.
- Consulta de sesión.
- Cierre de sesión.
- Respuesta 401 sin sesión.
- Listado de salas.
- Creación de reservas.
- Rechazo de horarios solapados.
- Aceptación de horarios consecutivos.
- Reservas en diferentes salas.
- Consulta de reservas del usuario.
- Comunicación entre React y Node.js.
- Redirección al login al recibir un 401.
- Persistencia de los datos en SQL Server.

## 10. Organización de Git

Se decidió utilizar commits separados para que el historial demostrara claramente el desarrollo de las diferentes partes del sistema.

Se creó un commit para el backend con la lógica de:

- autenticación
- sesiones
- salas
- reservas
- Sequelize
- SQL Server

Luego se creó otro commit para el frontend con:

- React
- login
- formulario de reservas
- listado de salas
- listado de reservas
- manejo de código 401

Finalmente se realizó un commit adicional para mejorar la documentación del proyecto en `decisiones.md` y `prompts.md`.