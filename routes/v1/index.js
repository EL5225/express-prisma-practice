import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../handlers/v1/user.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "OK! Welcome to Express Prisma API",
    data: null,
  });
});

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
