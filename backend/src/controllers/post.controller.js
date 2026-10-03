const { Post } = require("../models");
const { HttpError } = require("../middleware/errorHandler");

exports.list = async (_req, res) => {
    const posts = await Post.findAll({ order: [["publishedAt", "DESC"]] });
    res.json({ posts });
};

exports.create = async (req, res) => {
    const { title, type, state } = req.body;
    if (!title || !type || !state) {
        throw new HttpError(400, "Título, tipo y estado son obligatorios.");
    }

    const post = await Post.create({ title, type, state, userId: req.user.id });
    res.status(201).json({
        message: "Producto registrado satisfactoriamente.",
        post,
    });
};
