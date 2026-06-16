const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const { requireAuth } = require("../middleware/auth");

router.get("/", postsController.getAllPosts);
router.get("/new", requireAuth, postsController.getNewPost);
router.post("/", requireAuth, postsController.createPost);
router.get("/:id", postsController.getPost);
router.get("/:id/edit", requireAuth, postsController.getEditPost);
router.put("/:id", requireAuth, postsController.updatePost);
router.delete("/:id", requireAuth, postsController.deletePost);

module.exports = router;
