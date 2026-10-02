const { Model, DataTypes } = require("sequelize");
const db = require("../database");

class Post extends Model {
    toJSON() {
        const values = { ...this.get() };
        return values;
    }
}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: db.getInstance(),
        modelName: "Post",
        tableName: "posts",
        timestamps: true,
    },
);

module.exports = Post;
