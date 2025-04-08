# Laredu

Plataforma escolar con **Laravel 11** (backend) y **React 19** (frontend).

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación del Backend](#instalación-del-backend)
- [Archivo SQL](#archivo-sql)
- [Postman Collection](#postman-collection)
- [Licencia](#licencia)
- [Subir el Proyecto a GitHub](#subir-el-proyecto-a-github)

## Requisitos
- PHP ^8.2
- Composer
- Node.js & npm
- MySQL

## Instalación del Backend
1. Navega a la carpeta `backend`.
2. Copia `.env.example` a `.env` y configura la base de datos.
3. Ejecuta los siguientes comandos:
   ```
   composer install
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```
4. El backend estará disponible en [http://127.0.0.1:8000].

## Archivo SQL
- El backup de la base de datos se encuentra en `backend/database/laredu.sql`.
- Para importar manualmente en el servidor, utiliza:
  ```
  mysql -u user -p laredu < laredu.sql
  ```

## Postman Collection
- Importa `documentos/laredu.postman_collection.json` en Postman para probar los endpoints, en postman hay una opcion donde pone importar, pon el archivo alli.

## Licencia
- Abierta no comercia

## Subir el Proyecto a GitHub
1. Asegúrate de que tu `.gitignore` incluya:
   - `vendor/` (Laravel)
   - `node_modules/` (React)
   - `.env`
2. Agrega las carpetas `frontend/` y `backend/` al repositorio.
3. Realiza commit y push:
   ```
   git add .
   git commit -m "Add backend and frontend"
   git push
   ```
Al hacer commit, verás la estructura del proyecto en GitHub con las subcarpetas `backend` y `frontend` junto a este `README.md`.
## token
Se usa un token para la mayoria de las rutas, el token se consigue en el login, para el postman ponlo en el header Bearer <token>