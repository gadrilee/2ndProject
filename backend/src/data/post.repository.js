const Post = require("./models/Post.model");

class PostRepository {
    constructor() {
        this.model = Post;
    }

    async create(postData) {
        return await this.model.create(postData);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async findAll() {
        return await this.model.findAll();
    }

    async update(id, newPostData) {
        const post = await this.model.findByPk(id);
        if (!post) return false;
        await post.update(newPostData);
        return true;
    }
}

module.exports = new PostRepository();
