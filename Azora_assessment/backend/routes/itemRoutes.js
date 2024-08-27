const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createItem).get(protect, getItems);

router
  .route("/:id")
  .get(protect, getItemById)
  .patch(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
