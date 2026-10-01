const { Model, DataTypes } = require("sequelize");
const db = require("../database");

class User extends Model {
    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        delete values.resetToken;
        return values;
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db.getInstance(),
        modelName: "User",
        tableName: "users",
        timestamps: true,
    },
);

module.exports = User;
