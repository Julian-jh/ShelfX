import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [];
const JWT_SECRET = "your_jwt_secret_key";

export function registerUser({ username, password }) {
  const existing = users.find((u) => u.username === username);
  if (existing) return { error: "User already exists" };
  const hashed = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashed });
  return { success: true };
}

export function loginUser({ username, password }) {
  const user = users.find((u) => u.username === username);
  if (!user) return { error: "User not found" };
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return { error: "Invalid password" };
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  return { token };
}

export function logoutUser() {
  // For stateless JWT, logout is handled client-side by deleting token
  return { success: true };
}
