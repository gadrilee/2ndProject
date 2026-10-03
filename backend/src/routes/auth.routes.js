const router = require("express").Router();
const c = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/logout", c.logout);
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password", c.resetPassword);

router.get("/public-info", (_req, res) => {
    res.json({ message: "Ruta pública disponible sin credenciales." });
});
router.get("/profile", verifyToken, c.profile);

module.exports = router;
