import jwt from "jsonwebtoken";
import { UserSecured } from "../models/UserModel";

const secretKey = process.env.JWT_SECRET_KEY!;
export const signToken = (payload: UserSecured) => {
  return jwt.sign(payload, secretKey);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
