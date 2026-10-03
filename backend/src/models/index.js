const sequelize = require("../database/db");
const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId", as: "owner" });

module.exports = { sequelize, User, Post };
