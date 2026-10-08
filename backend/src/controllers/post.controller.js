const { Post, User } = require("../models");
const { HttpError } = require("../middleware/errorHandler");

exports.list = async (req, res) => {
    const posts = await Post.findAll({
        where: { userId: req.user.id },
        order: [["publishedAt", "DESC"]],
    });
    res.json({ posts });
};

exports.create = async (req, res) => {
    const { title, type, state } = req.body;
    if (!title || !type || !state) {
        throw new HttpError(400, "Título, tipo y estado son obligatorios.");
    }

    const owner = await User.findByPk(req.user.id);
    if (!owner) {
        throw new HttpError(
            401,
            "Tu sesión ya no es válida. Inicia sesión nuevamente.",
        );
    }

    const post = await Post.create({ title, type, state, userId: req.user.id });
    res.status(201).json({
        message: "Publicación registrada satisfactoriamente.",
        post,
    });
};

exports.update = async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
        throw new HttpError(404, "Publicación no encontrada.");
    }

    if (post.userId !== req.user.id) {
        throw new HttpError(403, "No puedes editar una publicación ajena.");
    }

    if (post.state === "reservado") {
        throw new HttpError(403, "No puedes editar una publicación reservada");
    }

    const { title, type, state } = req.body;

    if (!title || !type || !state) {
        throw new HttpError(400, "Título, tipo y estado son obligatorios.");
    }

    await post.update({ title, type, state });

    res.json({
        message: "Publicación actualizada satisfactoriamente",
        post,
    });
};

exports.delete = async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
        throw new HttpError(404, "Publicación no encontrada.");
    }

    if (post.userId !== req.user.id) {
        throw new HttpError(403, "No puedes eliminar una publicación ajena");
    }

    if (post.state === "reservado") {
        throw new HttpError(
            403,
            "No puedes eliminar una publicación reservada.",
        );
    }

    await post.destroy();

    res.json({
        message: "Publicación eliminada satisfactoriamente",
    });
};

exports.toggleReservation = async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
        throw new HttpError(404, "Publicación no encontrada.");
    }

    if (post.userId !== req.user.id) {
        throw new HttpError(403, "No puedes editar una publicación ajena.");
    }

    if (post.state === "intercambiado") {
        throw new HttpError(
            400,
            "No puedes reservar una publicación intercambiada",
        );
    }

    const state = post.state === "reservado" ? "disponible" : "reservado";
    await post.update({ state });

    res.json({
        message: state === "reservado"
            ? "Publicación reservada."
            : "Reserva liberada",
        post,
    });
};
