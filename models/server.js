const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      jobs: "/api/jobs",
      search: "/api/search",
      users: "/api/users",
    };

    //conectar a base de datos

    this.connectDB();

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.jobs, require("../routes/jobs"));
    this.app.use(this.paths.search, require("../routes/search"));
    // this.app.use(this.paths.categories, require("../routes/categories"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en el puerto `, this.port);
    });
  }
}

module.exports = Server;
