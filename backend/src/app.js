const express = require("express");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    async start() {
        try {
            this.app.listen(this.port, () => {
                console.log(
                    `Servidor activo en: http://localhost:${this.port}`,
                );
            });
        } catch (error) {
            console.error(
                "Error al inicializar el servidor:",
                error,
            );
        }
    }
}

const server = new Server();
server.start();
