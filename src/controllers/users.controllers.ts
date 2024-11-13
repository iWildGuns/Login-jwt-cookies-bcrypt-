import { Request, Response } from "express";
import { UserModel } from "../models/mysql/user.models";
import jwt from "jsonwebtoken";

export class UserController {
  userModel;

  constructor({ userModel }: { userModel: typeof UserModel }) {
    this.userModel = userModel;
  }

  register = async (req: Request, res: Response) => {
    const result = req.body;
    try {
      const newUser = await this.userModel.register({ input: result });

      console.log(`_______________________________________`, { newUser });

      res.status(203).json(newUser);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const result = req.body;
    try {
      const userLoged = await this.userModel.login({ input: result });
      const token = jwt.sign(
        { id: userLoged.id, username: userLoged.userName },
        process.env.SECRET_JWT_KEY!,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .json({ userLoged, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };
}

// export const logout = async (req: Request, res: Response) => {};
