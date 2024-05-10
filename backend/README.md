# Backend API - NodeJS-Express-MongoDB

## Description
This is a simple backend API that uses Node.js, Express and MongoDB. It is a simple API that allows you to create, read, update and delete data.

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following:
``` 
PORT=3000
MONGO_URI=your_mongo_uri
```
4. If you not have nodemon installed, run `npm install -g nodemon`
5. Then run `nodemon app` in backend root to start the server

## Endpoints
- GET `/api/v1/` - Get all data
- POST `/api/v1/` - Create data
- GET `/api/v1/:id` - Get data by ID
- PATCH `/api/v1/:id` - Update data by ID
- DELETE `/api/v1/:id` - Delete data by ID

## Videoaulas e tutoriais
* [(videoaula) Como criar uma API CRUD com Node.js, Express e MongoDB](https://www.youtube.com/watch?v=K5QaTfE5ylk&t=33s)
* [(videoaula) Autenticação com Node.js e MongoDB com JWT](https://www.youtube.com/watch?v=qEBoZ8lJR3k)
* [(tutorial) Criando uma API RESTful utilizando Node.js, Express.js e Mongoose](https://community.revelo.com.br/criando-uma-api-restful-utilizando-node-js-express-js-e-mongoose/)