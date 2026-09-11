const express = require("express");
const mysql = require("mysql2/promise");
const Redis = require("ioredis");

const app = express();
const pool = mysql.createPool({
  host: 'mysql-db',      // nome do container — é isso que a rede resolve
  user: 'root',
  port: process.env.MYSQL_DB_PORTA,            // porta interna do container MySQL (3307 é só o mapeamento externo)
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

const redis = new Redis({
  host: 'redis',          // nome do container — resolvido pela rede do Docker
  port: process.env.REDIS_PORTA,
});

const CACHE_TTL_SEGUNDOS = 60;

app.get('/categorias', async (req, res) => {
  const cacheKey = 'categorias';
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const [rows] = await pool.query('SELECT * FROM categorias');
  await redis.set(cacheKey, JSON.stringify(rows), 'EX', CACHE_TTL_SEGUNDOS);
  res.json(rows);
});

app.get('/produtos', async (req, res) => {
  const cacheKey = 'produtos';
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const [rows] = await pool.query(`
    SELECT p.id, p.nome, p.preco, p.quantidade_estoque, c.nome AS categoria
    FROM produtos p
    JOIN categorias c ON p.categoria_id = c.id
  `);
  await redis.set(cacheKey, JSON.stringify(rows), 'EX', CACHE_TTL_SEGUNDOS);
  res.json(rows);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000");
});
