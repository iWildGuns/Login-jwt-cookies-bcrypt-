import { Users } from "../../entity/Users";
import bcrypt from "bcrypt";

type UserInput = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  country: string;
};

type LoginInput = UserInput & {
  verifyPassword: string;
};

export class UserModel {
  static async register({ input }: { input: UserInput }) {
    const { firstname, lastname, username, email, password, country } = input;
    const user = new Users();
    const userNameCheck = await Users.findOneBy({ userName: username });
    const emailCheck = await Users.findOneBy({ email: email });
    const hashPass = await bcrypt.hash(password, 10);

    console.log(input.username);
    // console.log(username?.userName);

    if (userNameCheck) throw new Error(`username already exists...`);
    if (emailCheck) throw new Error(`email already exists...`);

    user.userName = username;
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    user.password = hashPass;
    user.country = country;

    await user.save();

    return user;
  }

  static async login({ input }: { input: LoginInput }) {
    const { username, password, verifyPassword } = input;
    if (password === "" || username === "" || verifyPassword === "")
      throw new Error("Username and passaword fields are required...");

    if (password !== verifyPassword)
      throw new Error("Password verification failed...");

    const user = await Users.findOneBy({ userName: username });
    if (!user) throw new Error(`User not found...`);

    const PassValidate = await bcrypt.compare(password, user.password);
    if (!PassValidate) throw new Error("Password is incorrect...");

    const userLoged = user;

    return userLoged;
  }
  //   console.log(`__________________`, user?.password);
}
