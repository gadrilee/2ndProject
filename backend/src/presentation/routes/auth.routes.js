const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../../middleware/auth.middleware");

class AuthRouter {
    constructor() {
        this.router = Router();
        this.controller = authController;
        this.middleware = authMiddleware;
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/register", this.controller.register);
        this.router.post("/login", this.controller.login);
        this.router.post("/logout", this.controller.logout);
        this.router.post("/forgot-password", this.controller.requestReset);
        this.router.post("/reset-password", this.controller.resetPassword);

        this.router.get("/public-info", (_req, res) => {
            res.json({ message: "Ruta pública disponible sin credenciales." });
        });

        this.router.get(
            "/profile",
            authMiddleware.verifyToken,
            authController.getProfile,
        );
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AuthRouter().getRouter();
