const postRepository = require("../data/post.repository");

class PostService {
    constructor() {
        this.postRepo = postRepository;
    }

    async create({ title, type, state }) {
        const createdPost = await this.postRepo.create({
            title,
            type,
            state,
        });

        return createdPost.toJSON();
    }

    async findAll() {
        const posts = await this.postRepo.findAll();

        return {
            posts,
        };
    }
}

module.exports = new PostService();
