const { Router } = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../../middleware/auth.middleware");

class PostRouter {
    constructor() {
        this.router = Router();
        this.controller = postController;
        this.middleware = authMiddleware;
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/create", this.controller.create);
        this.router.post("/getall", this.controller.getAll);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PostRouter().getRouter();
