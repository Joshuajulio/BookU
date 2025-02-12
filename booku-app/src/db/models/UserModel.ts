import { getDb } from "../config/mongodb";
import { z } from "zod";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserSecured = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
};

const UserValidation = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export type LoginType = {
  email: string;
  password: string;
};

export default class UserModel {
  static getCollection() {
    const db = getDb();
    return db.collection<User>("users");
  }

  static async findAll() {
    const collection = this.getCollection();
    const users = await collection.find().toArray();
    return users;
  }

  static async findByEmailUsername(query: string) {
    const collection = this.getCollection();
    const user = await collection.findOne({
      $or: [{ email: query }, { username: query }],
    });
    return user;
  }

  static async register(payload: User) {
    UserValidation.parse(payload);

    console.log("masuk server");
    const collection = this.getCollection();

    let user = await this.findByEmailUsername(payload.email);
    if (user) {
      throw {
        name: "error",
        message: "Email already registered",
      };
    }

    user = await this.findByEmailUsername(payload.username);
    if (user) {
      throw new Error("Username already registered");
    }

    payload.password = hashPassword(payload.password);
    await collection.insertOne(payload);
    console.log(`${payload.username} successfully registered`);
    return `${payload.username} successfully registered`;
  }

  static async login(payload: LoginType) {
    const LoginValidation = z.object({
      email: z.string().email(),
      password: z.string().min(5),
    });

    LoginValidation.parse(payload);

    const collection = this.getCollection();
    const user = await collection.findOne({ email: payload.email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = comparePassword(payload.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = signToken({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });

    return token;
  }
}
