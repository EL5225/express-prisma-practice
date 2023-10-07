import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../handlers/v1/user.js";
import {
  assignCategorytoPost,
  createPost,
  getAllPosts,
  getPost,
  updatePost,
} from "../../handlers/v1/post.js";
import {
  createNewCategory,
  getAllCategories,
} from "../../handlers/v1/category.js";
import {
  createProfile,
  getAllProfiles,
  getProfile,
} from "../../handlers/v1/profile.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "OK! Welcome to Express Prisma API",
    data: null,
  });
});

// Users
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Posts
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.put("/posts/assign-category/:id", assignCategorytoPost);

// categories
router.post("/categories", createNewCategory);
router.get("/categories", getAllCategories);

// profiles
router.post("/profiles", createProfile);
router.get("/profiles", getAllProfiles);
router.get("/profiles/:id", getProfile);

export default router;
