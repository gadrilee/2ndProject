const bcrypt = require("bcryptjs");
require("./config");
const { sequelize, User } = require("../models");

const users = [
    { name: "Martita Becerra", email: "martita@truequeu.com" },
    { name: "Admin Demo", email: "admin@truequeu.com" },
    { name: "Usuario Invitado", email: "invitado@truequeu.com" },
];

async function run() {
    try {
        console.log("Iniciando conexión con SQLite...");
        await sequelize.sync({ alter: true });

        const password = await bcrypt.hash("Password123!", 10);

        console.log("Insertando usuarios semilla...");
        for (const data of users) {
            const [user, created] = await User.findOrCreate({
                where: { email: data.email },
                defaults: { ...data, password },
            });
            console.log(
                created
                    ? `+ Creado: "${user.name}", "${user.email}"`
                    : `~ Ya existía: ${user.email}`,
            );
        }

        console.log("Carga de datos inicial completada.");
        process.exit(0);
    } catch (error) {
        console.error("Error al ejecutar el sembrado de datos:", error);
        process.exit(1);
    }
}

run();
