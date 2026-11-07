# Prompts utilizados durante el desarrollo

Durante la realización del proyecto se utilizó inteligencia artificial como apoyo para comprender la estructura del sistema, resolver errores y desarrollar diferentes partes de la aplicación.

A continuación se documentan los principales prompts y consultas realizadas.

## 1. Creación inicial del proyecto

"Ayúdame a crear paso a paso una aplicación web para reservas de una biblioteca donde el stack obligatorio sea Node.js + Sequelize en el backend, React básico en el frontend y sesión mediante cookies."

## 2. Requisitos del sistema

"El sistema debe tener login de usuario con sesión de cookie, listado de salas, formulario para crear una reserva con sala, fecha, hora inicio y hora fin, impedir horarios solapados y redirigir al login cuando el frontend reciba un 401."

## 3. Estructura del proyecto

"Dame la estructura, nombres de archivos y código de cada archivo para poder crear el proyecto manualmente desde Visual Studio Code."

## 4. Creación del backend

"Ayúdame a crear paso a paso el backend con Node.js, Express y Sequelize."

## 5. Instalación de dependencias

"¿Qué dependencias necesito instalar para utilizar Express, Sequelize, sesiones, bcrypt y la base de datos?"

## 6. Configuración inicial de Sequelize

"Ayúdame a configurar Sequelize para conectarlo a la base de datos."

## 7. Cambio de PostgreSQL a SQL Server

"No conozco la contraseña de PostgreSQL. ¿Podemos cambiar la base de datos a SQL Server?"

## 8. Configuración de SQL Server

"Ayúdame a conectar Sequelize con mi instancia localhost\SQL2026."

## 9. Reinicio de SQL Server

"Cambié la configuración de autenticación de SQL Server. ¿Cómo reinicio el servicio?"

## 10. Problema de conexión SQL Server

"Sequelize muestra Failed to connect to localhost\SQL2026 in 15000ms. ¿Cómo puedo solucionarlo?"

## 11. SQL Server Browser

"SQL Server Browser aparece deshabilitado. ¿Qué debo cambiar para que Node.js pueda conectarse a la instancia?"

## 12. Creación de modelos

"Ayúdame a crear los modelos Usuario, Sala y Reserva utilizando Sequelize."

## 13. Relaciones entre modelos

"Ayúdame a relacionar Usuario, Sala y Reserva para que un usuario tenga muchas reservas y una sala tenga muchas reservas."

## 14. Creación automática de tablas

"¿Cómo hago para que Sequelize cree las tablas automáticamente en SQL Server?"

## 15. Datos iniciales

"Ayúdame a crear un seed para agregar un usuario de prueba y varias salas."

## 16. Cifrado de contraseña

"Ayúdame a guardar la contraseña del usuario utilizando bcryptjs para que no quede almacenada directamente."

## 17. Login

"Ayúdame a crear el login utilizando correo y contraseña."

## 18. Sesiones mediante cookies

"Ayúdame a configurar express-session para manejar la autenticación mediante cookies."

## 19. Expiración por inactividad

"La sesión debe expirar a los 30 minutos de inactividad. ¿Cómo puedo configurarlo?"

## 20. Middleware de autenticación

"Ayúdame a crear un middleware para proteger las rutas y devolver un código 401 cuando no exista una sesión válida."

## 21. Error req.session

"Me aparece Cannot set properties of undefined setting usuarioId en auth.routes.js. ¿Cómo lo corrijo?"

## 22. Prueba del login

"Ayúdame a probar el login mediante Postman."

## 23. Consulta de sesión

"Ayúdame a crear una ruta para comprobar si el usuario todavía tiene una sesión válida."

## 24. Logout

"Ayúdame a crear una ruta para cerrar la sesión y eliminar la cookie."

## 25. Listado de salas

"Ayúdame a crear una ruta protegida para listar todas las salas disponibles."

## 26. Creación de reservas

"Ayúdame a crear una ruta para registrar una reserva indicando sala, fecha, hora inicio y hora fin."

## 27. Validación de horarios

"Ayúdame a validar que la hora de inicio sea menor que la hora de finalización."

## 28. Evitar reservas solapadas

"Ayúdame a impedir que una sala tenga dos reservas cuyos horarios se crucen."

## 29. Prueba de solapamientos

"¿Cómo puedo probar que una reserva de 09:00 a 10:00 impida otra reserva de 09:30 a 10:30 pero permita una de 10:00 a 11:00?"

## 30. Listado de reservas

"Ayúdame a crear una ruta para listar las reservas realizadas por el usuario que inició sesión."

## 31. Preparación de Git

"Ayúdame a crear el archivo .gitignore para evitar subir node_modules, .env y otros archivos innecesarios."

## 32. Primer commit

"Ayúdame a crear un primer commit que contenga solamente el backend."

## 33. Error al inicializar Git

"Ejecuté git init y git add desde el Escritorio y Git está intentando agregar todos mis archivos. ¿Cómo lo corrijo?"

## 34. Configuración del repositorio remoto

"Ayúdame a configurar como origin el repositorio de GitHub asignado para el proyecto."

## 35. Creación del frontend

"Ayúdame a crear el frontend utilizando React básico y Vite."

## 36. Creación de Vite

"npm no encuentra package.json dentro de frontend. ¿Cómo creo correctamente el proyecto de Vite?"

## 37. Pantalla de login

"Ayúdame a crear una interfaz sencilla de login en React."

## 38. Comunicación React con backend

"Ayúdame a crear un archivo api.js para centralizar las peticiones al backend."

## 39. Cookies desde React

"¿Cómo hago para que fetch envíe la cookie de sesión al backend?"

## 40. Interfaz de reservas

"Ayúdame a crear una pantalla que muestre las salas, permita crear una reserva y muestre las reservas del usuario."

## 41. Manejo de error 401

"Ayúdame a hacer que React vuelva automáticamente al login cuando una petición al backend responda con código 401."

## 42. Error de pantalla blanca

"React muestra una pantalla completamente blanca. ¿Cómo puedo encontrar el error?"

## 43. Error de exportación de api.js

"La consola muestra que api.js no proporciona un export llamado api. ¿Cómo lo corrijo?"

## 44. Segundo commit

"Ayúdame a crear el segundo commit correspondiente al frontend."

## 45. Documentación final

"Ayúdame a ampliar decisiones.md y prompts.md utilizando todo el proceso realizado durante este chat."