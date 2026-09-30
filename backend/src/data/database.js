const { Sequelize } = require("sequelize");
const path = require("path");

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: path.join(__dirname, "../../database.sqlite"),
            logging: false,
        });
    }

    getInstance() {
        return this.sequelize;
    }

    async testConnection() {
        await this.sequelize.authenticate();
    }

    async syncDatabase() {
        await this.sequelize.sync();
    }
}

module.exports = new Database();
