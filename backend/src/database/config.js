const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET en el archivo .env (copia example.env).");
}

module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtDuration: "8h",
    resetTokenMinutes: 30,
};
