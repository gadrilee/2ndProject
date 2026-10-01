const User = require("./models/User.model");

class UserRepository {
    constructor() {
        this.model = User;
    }

    async create(userData) {
        return await this.model.create(userData);
    }

    async findByEmail(email) {
        return await this.model.findOne({
            where: { email: email.toLowerCase() },
        });
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async updatePassword(id, newHashedPassword) {
        const user = await this.model.findByPk(id);
        if (!user) return false;

        user.password = newHashedPassword;
        user.resetToken = null;
        await user.save();
        return true;
    }

    async saveResetToken(email, token) {
        const user = await this.findByEmail(email);
        if (!user) return false;

        user.resetToken = token;
        await user.save();
        return true;
    }

    async findByResetToken(token) {
        return await this.model.findOne({
            where: { resetToken: token },
        });
    }
}

module.exports = new UserRepository();
