const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const database = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "app_db",
  user: process.env.DB_USER || "app_user",
  password: process.env.DB_PASSWORD || "app_password",
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  res.send("Rodando dentro de um container Docker com Node!");
});

app.get("/produtos", async (req, res) => {
  try {
    const [produtos] = await database.query("SELECT * FROM produtos");
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).json({ erro: "Não foi possível buscar os produtos" });
  }
});

app.get("/categorias", async (req, res) => {
  try {
    const [categorias] = await database.query("SELECT * FROM categorias");
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.message);
    res.status(500).json({ erro: "Não foi possível buscar as categorias" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000 100%");
});
