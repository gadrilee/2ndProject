const router = require("express").Router();
const c = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/posts", c.list);
router.post("/posts", verifyToken, c.create);
router.put("/posts/:id", verifyToken, c.update);

module.exports = router;
