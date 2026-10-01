const jwt = require("jsonwebtoken");

class AuthMiddleware {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "clave_secreta_super_segura";

        this.verifyToken = this.verifyToken.bind(this);
    }

    verifyToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error:
                    "Acceso no autorizado: No se proporcionó un token de sesión.",
            });
        }

        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(403).json({
                error:
                    "Token inválido o expirado. Debe iniciar sesión nuevamente.",
            });
        }
    }
}

module.exports = new AuthMiddleware();
