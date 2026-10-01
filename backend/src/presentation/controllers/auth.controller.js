const authService = require("../../service/auth.service");

class AuthController {
    constructor() {
        this.authService = authService;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.requestReset = this.requestReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    error: "Nombre, email y contraseña son obligatorios.",
                });
            }

            const user = await this.authService.register({
                name,
                email,
                password,
            });

            return res.status(201).json({
                message: "Usuario registrado satisfactoriamente.",
                user,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "Email y contraseña requeridos.",
                });
            }

            const sessionData = await this.authService.login({
                email,
                password,
            });

            return res.json(sessionData);
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }

    logout(_req, res) {
        return res.json({ message: "Sesión cerrada correctamente." });
    }

    async requestReset(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    error: "El email es obligatorio.",
                });
            }

            const response = await this.authService.requestPasswordReset(email);
            return res.json(response);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { resetToken, newPassword } = req.body;
            if (!resetToken || !newPassword) {
                return res.status(400).json({
                    error: "El token y la nueva contraseña son requeridos.",
                });
            }

            const response = await this.authService.resetPassword({
                resetToken,
                newPassword,
            });

            return res.json(response);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    getProfile(req, res) {
        return res.json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
            },
        });
    }
}

module.exports = new AuthController();
