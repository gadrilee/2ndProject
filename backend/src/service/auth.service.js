const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepository = require("../data/user.repository");

class AuthService {
    constructor() {
        this.userRepo = userRepository;
        this.jwtSecret = process.env.JWT_SECRET || "clave_secreta_super_segura";
        this.tokenDuration = "8h";
    }

    async register({ name, email, password }) {
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error(
                "El correo electrónico ya se encuentra registrado.",
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await this.userRepo.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        return createdUser.toJSON();
    }

    async login({ email, password }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Credenciales inválidas.");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Credenciales inválidas.");
        }

        const token = this.generateToken(user);
        return {
            token,
            user: user.toJSON(),
        };
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            this.jwtSecret,
            { expiresIn: this.tokenDuration },
        );
    }

    async requestPasswordReset(email) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            return {
                message:
                    "Si el correo existe en el sistema, el token fue emitido.",
            };
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        await this.userRepo.saveResetToken(email, resetToken);

        return {
            message: "Token de recuperación generado exitosamente.",
            simulatedResetToken: resetToken,
        };
    }

    async resetPassword({ resetToken, newPassword }) {
        const user = await this.userRepo.findByResetToken(resetToken);
        if (!user) {
            throw new Error(
                "El token de restablecimiento es inválido o ha caducado.",
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepo.updatePassword(user.id, hashedPassword);

        return { message: "Contraseña cambiada exitosamente." };
    }
}

module.exports = new AuthService();
