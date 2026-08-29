const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const pool = mysql.createPool({
  host: 'mysql-db',      // nome do container — é isso que a rede resolve
  user: 'root',
  port: 3306,            // porta interna do container MySQL (3307 é só o mapeamento externo)
  password: 'senha123',
  database: 'loja',
});

app.get('/categorias', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categorias');
  res.json(rows);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000");
});

app.get('/produtos', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.id, p.nome, p.preco, p.quantidade_estoque, c.nome AS categoria
    FROM produtos p
    JOIN categorias c ON p.categoria_id = c.id
  `);
  res.json(rows);
});