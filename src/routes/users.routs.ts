import { UserController } from "../controllers/users.controllers";
import { UserModel } from "../models/mysql/user.models";
import { Router } from "express";

const router = Router();
const userController = new UserController({ userModel: UserModel });

router.post("/register", userController.register);
router.post("/login", userController.login);
// router.post("/login", logout);

export default router;
