const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());


// Rota para obter o "algoritmo do dia"
app.get("/algorithm-of-the-day", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; 

   
    const { rows: todayAlg } = await pool.query(
      "SELECT a.* FROM algorithm_of_the_day d JOIN algorithms_structures a ON d.algorithm_id = a.id WHERE d.date = $1",
      [today]
    );

    if (todayAlg.length > 0) {
      return res.json(todayAlg[0]);
    }

    const { rows: allAlgs } = await pool.query("SELECT * FROM algorithms_structures");

    // Busca os IDs dos algoritmos que já foram definidos como "algoritmo do dia"
    const { rows: usedAlgs } = await pool.query("SELECT algorithm_id FROM algorithm_of_the_day");

   
    const usedIds = usedAlgs.map((row) => row.algorithm_id);
    const unusedAlgs = allAlgs.filter((alg) => !usedIds.includes(alg.id));


    if (unusedAlgs.length === 0) {
      await pool.query("DELETE FROM algorithm_of_the_day");
      unusedAlgs.push(...allAlgs);
    }

    // Sorteia um algoritmo aleatório dos algoritmos não utilizados
    const sorteado = unusedAlgs[Math.floor(Math.random() * unusedAlgs.length)];

    // Salva o algoritmo sorteado como o "algoritmo do dia" na tabela 'algorithm_of_the_day'
    await pool.query(
      "INSERT INTO algorithm_of_the_day (algorithm_id, date) VALUES ($1, $2)",
      [sorteado.id, today]
    );


    res.json(sorteado);
  } catch (err) {

    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Rota para autocomplete de nomes de algoritmos
app.get("/autocomplete", async (req, res) => {

  const { q } = req.query;


  if (!q) return res.json([]);

  try {

    // que começam com a string de consulta (case-insensitive)
    const result = await pool.query(
      `SELECT name FROM algorithms_structures
       WHERE LOWER(name) LIKE $1
       ORDER BY name
       LIMIT 10`,
      [`${q.toLowerCase()}%`]
    );

  
    const names = result.rows.map(row => row.name);
  
    res.json(names);
  } catch (err) {
  
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

// Rota para autocomplete de nomes de linguagens
app.get("/autocomplete-language", async (req, res) => {
  // Obtém o parâmetro de consulta 'q' da URL
  const { q } = req.query;

  // Se não houver parâmetro 'q', retorna um array JSON vazio
  if (!q) return res.json([]);

  try {
    // Executa uma consulta ao banco de dados para buscar nomes de linguagens
    // que começam com a string de consulta (case-insensitive)
    const result = await pool.query(
      `SELECT name FROM languages
       WHERE LOWER(name) LIKE $1
       ORDER BY name
       LIMIT 10`,
      [`${q.toLowerCase()}%`]
    );

    // Extrai os nomes das linguagens dos resultados da consulta
    const names = result.rows.map((row) => row.name);
    // Retorna os nomes como um array JSON
    res.json(names);
  } catch (err) {
    // Em caso de erro, loga o erro no console e envia uma resposta de erro com status 500
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados de linguagem" });
  }
});

app.get("/algorithm", async (req, res) => {
  try {
    const name = req.query.name;

    const { rows } = await pool.query(
      "SELECT * FROM algorithms_structures WHERE LOWER(name) = LOWER($1)",
      [name]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Algoritmo não encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar algoritmo");
  }
});


app.get("/language-of-the-day", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { rows: todayLan } = await pool.query(
      "SELECT a.* FROM language_of_the_day d JOIN languages a ON d.language_id = a.id WHERE d.date = $1",
      [today]
    );

    if (todayLan.length > 0) {
      return res.json(todayLan[0]);
    }

    const { rows: allLan } = await pool.query("SELECT * FROM languages");

    const { rows: usedLans } = await pool.query("SELECT language_id FROM language_of_the_day");

    const usedIds = usedLans.map((row) => row.language_id);
    const unusedLans = allLan.filter((lan) => !usedIds.includes(lan.id));

    if (unusedLans.length === 0) {
      await pool.query("DELETE FROM language_of_the_day");
      unusedLans.push(...allLan);
    }

    const sorteado = unusedLans[Math.floor(Math.random() * unusedLans.length)];

    await pool.query(
      "INSERT INTO language_of_the_day (language_id, date) VALUES ($1, $2)",
      [sorteado.id, today]
    );

    res.json(sorteado);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});


app.use(express.json()); 

// REGISTRO
app.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, pass) VALUES ($1, $2, $3) RETURNING *",
      [name, email, pass]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});


// LOGIN
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND pass = $2",
      [email, pass]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    res.status(200).json({ message: "Login bem-sucedido!", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no login" });
  }
});


app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
    res.status(200).json({ message: "Nome atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar nome" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM users ORDER BY name ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});
