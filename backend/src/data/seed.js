require("dotenv").config();
const bcrypt = require("bcryptjs");
const database = require("./database");
const User = require("./models/User.model");

class DatabaseSeeder {
    constructor() {
        this.database = database;
        this.userModel = User;
    }

    async run() {
        try {
            console.log("Iniciando conexión con SQLite...");
            await this.database.syncDatabase();

            const defaultPassword = await bcrypt.hash("Password123!", 10);

            const initialUsers = [
                {
                    name: "Martita Becerra",
                    email: "martita@truequeu.com",
                    password: defaultPassword,
                },
                {
                    name: "Admin Demo",
                    email: "admin@truequeu.com",
                    password: defaultPassword,
                },
                {
                    name: "Usuario Invitado",
                    email: "invitado@truequeu.com",
                    password: defaultPassword,
                },
            ];

            console.log("Insertando usuarios semilla...");
            for (const userData of initialUsers) {
                const [user, created] = await this.userModel.findOrCreate({
                    where: { email: userData.email },
                    defaults: userData,
                });

                if (created) {
                    console.log(`+ Creado: "${user.name}", "${user.email}"`);
                } else {
                    console.log(`~ Ya existía: ${user.email}`);
                }
            }

            console.log("Carga de datos inicial completada.");
            process.exit(0);
        } catch (error) {
            console.error("Error al ejecutar el sembrado de datos:", error);
            process.exit(1);
        }
    }
}

const seeder = new DatabaseSeeder();
seeder.run();
