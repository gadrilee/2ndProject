require("dotenv").config();

const express = require("express");
const cors = require("cors");
const database = require("./data/database");
const authRoutes = require("./presentation/routes/auth.routes");
const postRoutes = require("./presentation/routes/post.routes");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use("/api", [authRoutes, postRoutes]);
    }

    async start() {
        try {
            await database.syncDatabase();
            console.log("Base de datos SQLite sincronizada exitosamente.");

            this.app.listen(this.port, () => {
                console.log(
                    `Servidor activo en: http://localhost:${this.port}`,
                );
            });
        } catch (error) {
            console.error(
                "Error al inicializar  la base de datos o el servidor:",
                error,
            );
        }
    }
}

const server = new Server();
server.start();
