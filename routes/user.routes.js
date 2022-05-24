const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

// Partie authentification

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// Partie user BDD

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// Mis à jour (update)
router.put("/:id", userController.updateUser);
// Suppression
router.delete("/:id", userController.deleteUser);
// Ajout données
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// Upload

router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
