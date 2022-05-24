const router = require("express").Router();
const restaurantController = require("../controllers/restaurant.controller");
const multer = require("multer");
const upload = multer();

router.get("/", restaurantController.readRestaurant);
router.post("/", upload.single("file"), restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);
router.patch("/like-restaurant/:id", restaurantController.likeRestaurant);
router.patch("/unlike-restaurant/:id", restaurantController.unlikeRestaurant);

// Commentaires

router.patch("/comment-restaurant/:id", restaurantController.commentRestaurant);
router.patch(
  "/edit-comment-restaurant/:id",
  restaurantController.editCommentRestaurant
);
router.patch(
  "/delete-comment-restaurant/:id",
  restaurantController.deleteCommentRestaurant
);

// Plats

router.patch("/dish-restaurant/:id", restaurantController.dishRestaurant);
router.patch(
  "/edit-dish-restaurant/:id",
  restaurantController.editDishRestaurant
);
router.patch(
  "/delete-dish-restaurant/:id",
  restaurantController.deleteDishRestaurant
);

module.exports = router;
