import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { registerUser, loginUser, logoutUser } from "./auth.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure nodemailer transporter once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GraphQL Schema
const schema = buildSchema(`
  type User {
    username: String!
    token: String
  }

  type AuthResponse {
    success: Boolean
    token: String
    error: String
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    category: String!
    price: Float!
    cover: String!
    quantity: Int
  }

  type ReceiptResponse {
    success: Boolean!
    error: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    register(username: String!, password: String!): AuthResponse!
    login(username: String!, password: String!): AuthResponse!
    logout: AuthResponse!
    sendReceipt(email: String!, books: [BookInput!]!, total: Float!): ReceiptResponse!
  }

  input BookInput {
    id: ID!
    title: String!
    author: String!
    price: Float!
    quantity: Int!
  }
`);

// Sample books data
const sampleBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    price: 12.99,
    cover: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    price: 10.99,
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    price: 11.99,
    cover: "https://covers.openlibrary.org/b/id/10582258-L.jpg",
  },
];

// GraphQL Resolvers
const root = {
  books: () => sampleBooks,

  register: ({ username, password }) => {
    const result = registerUser({ username, password });
    if (result.error) {
      return { success: false, error: result.error, token: null };
    }
    return { success: true, error: null, token: null };
  },

  login: ({ username, password }) => {
    const result = loginUser({ username, password });
    if (result.error) {
      return { success: false, error: result.error, token: null };
    }
    return { success: true, error: null, token: result.token };
  },

  logout: () => {
    const result = logoutUser();
    return { success: result.success, error: null, token: null };
  },

  sendReceipt: async ({ email, books, total }) => {
    if (!email || !books || !total) {
      return { success: false, error: "Missing data" };
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("EMAIL_USER or EMAIL_PASS not set in .env file");
      return { success: false, error: "Email configuration missing" };
    }

    console.log("Attempting to send email from:", process.env.EMAIL_USER);

    const bookList = books
      .map((b) => `${b.title} (x${b.quantity || 1}): $${b.price.toFixed(2)}`)
      .join("<br>");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ShelfX Receipt",
      html: `<h2>Your ShelfX Receipt</h2><div>${bookList}</div><div style='margin-top:16px;font-weight:bold;'>Total: $${total.toFixed(
        2
      )}</div>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", email);
      return { success: true, error: null };
    } catch (err) {
      console.error("Email sending failed:", err.message);
      return { success: false, error: "Failed to send email: " + err.message };
    }
  },
};

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL interface for testing
  })
);

// REST API endpoints for backward compatibility
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
  res.json(logoutUser());
});

app.post("/api/send-receipt", async (req, res) => {
  const { email, books, total } = req.body;
  if (!email || !books || !total)
    return res.status(400).json({ error: "Missing data" });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS not set in .env file");
    return res.status(500).json({ error: "Email configuration missing" });
  }

  console.log("Attempting to send email from:", process.env.EMAIL_USER);

  const bookList = books
    .map((b) => `${b.title} (x${b.quantity || 1}): $${b.price.toFixed(2)}`)
    .join("<br>");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "ShelfX Receipt",
    html: `<h2>Your ShelfX Receipt</h2><div>${bookList}</div><div style='margin-top:16px;font-weight:bold;'>Total: $${total.toFixed(
      2
    )}</div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
    res.json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: "Failed to send email: " + err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}`);
  console.log(
    `GraphiQL interface available at http://localhost:${PORT}/graphql`
  );
});
