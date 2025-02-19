### Primer Proyecto con Express y TypeScript
#
# Udemy - https://www.udemy.com/course/curso-full-stack-nodejs-react-typescript-nestjs-nextjs

# Backend

- npm init
- npm install express

# Modo Watch en NodeJS
    Ahora es nativo de NodeJS
    Agregar el script en package.json

- node --watch index.js

"scripts": {
    "dev": "node --watch index.js"
  }
para ejecutar: npm run dev

# Nodemon
- npm i -D nodemon (-D en modo desarrollo, para que cuando lo despleguemos no se deploye en producción)
- npm i --save-dev nodemon (--save-dev igual que -D en modo desarrollo)

# TypeScript
- npm i -D typescript ts-node
 
    Agregar el `tsconfig.json`
    Cambiar el `package.json`
    Agregar carpeta src y mover archivo index.js a esta carpeta
    Cambiar extensión de index.js -> index.ts
- npm i -D @types/express

# Mongoose
- npm i mongoose

# Variables de entorno
- npm i dovenv

# Colores en la terminal para errores e información
- npm i colors

