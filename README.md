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