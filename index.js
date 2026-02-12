import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/products", async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    "INSERT INTO products(name) VALUES($1) RETURNING *",
    [name]
  );
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});