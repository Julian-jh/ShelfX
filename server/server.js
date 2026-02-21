import express from "express";
import cors from "cors";
import { registerUser, loginUser, logoutUser } from "./auth.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

app.get("/", (req, res) => {
  res.send("ShelfX backend is running.");
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const result = registerUser({ username, password });
  if (result.error) return res.status(400).json({ error: result.error });
  res.json({ success: true });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const result = loginUser({ username, password });
  if (result.error) return res.status(400).json({ error: result.error });
  res.json({ token: result.token });
});

app.post("/api/logout", (req, res) => {
  // For stateless JWT, logout is handled client-side
  res.json(logoutUser());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
