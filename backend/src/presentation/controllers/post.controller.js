const postService = require("../../service/post.service");

class PostController {
    constructor() {
        this.postService = postService;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async create(req, res) {
        try {
            const { title, type, state } = req.body;
            if (!title || !type || !state) {
                return res.status(400).json({
                    error: "Titulo, tipo, estado son obligatorios.",
                });
            }

            const post = await this.postService.create({
                title,
                type,
                state,
            });

            return res.status(201).json({
                message: "Producto registrado satisfactoriamente.",
                post,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await this.postService.findAll();
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PostController();
