const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {
    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        delete values.resetToken;
        delete values.resetTokenExpires;
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
            allowNull: false },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { 
                isEmail: true 
            },
        },
        password: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        resetToken: { 
            type: DataTypes.STRING, 
            allowNull: true 
        },
    },
    { 
        sequelize, 
        modelName: "User", 
        tableName: "users", 
        timestamps: true 
    },
);

module.exports = User;
