const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database');

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// endpoint de teste
app.get('/', (req, res) => {
  res.send('API do Sistema está funcionando!');
});

// endpoint para cadastrar um atendimento
app.post('/atendimentos', (req, res) => {
  const { numeroAtendimento, nomePaciente, sexo, email, celular, exames } = req.body;

  const sqlAtendimento = `
        INSERT INTO atendimentos (numero_atendimento, nome_completo, sexo, email, celular)
        VALUES (?, ?, ?, ?, ?)
    `;
  const paramsAtendimento = [numeroAtendimento, nomePaciente, sexo, email, celular];

  db.run(sqlAtendimento, paramsAtendimento, function (err) {
    if (err) {
      console.error('Erro ao salvar atendimento:', err.message);
      return res.status(500).json({ message: 'Erro ao salvar atendimento.' });
    }

    const atendimentoId = this.lastID;

    // inserir os exames associados ao atendimento (se houver)
    if (exames && exames.length > 0) {
      const sqlExames = `
                INSERT INTO paciente_exames (paciente_id, exame_id)
                SELECT ?, id FROM exames WHERE codigo = ?
            `;

      const examesPromises = exames.map((codigoExame) => {
        return new Promise((resolve, reject) => {
          db.run(sqlExames, [atendimentoId, codigoExame], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });

      Promise.all(examesPromises)
        .then(() => res.status(201).json({ message: 'Atendimento salvo com sucesso!' }))
        .catch((error) => {
          console.error('Erro ao salvar exames:', error.message);
          res.status(500).json({ message: 'Erro ao salvar exames do atendimento.' });
        });
    } else {
      res.status(201).json({ message: 'Atendimento salvo com sucesso!' });
    }
  });
});

// endpoint para listar todos os atendimentos cadastrados
app.get('/atendimentos', (req, res) => {
  const sql = `
        SELECT 
            a.numero_atendimento AS numero_atendimento, 
            a.nome_completo AS nomePaciente, 
            a.sexo, 
            a.email, 
            a.celular, 
            IFNULL(GROUP_CONCAT(e.codigo, ', '), 'Nenhum') AS exames
        FROM atendimentos a
        LEFT JOIN paciente_exames pe ON a.id = pe.paciente_id
        LEFT JOIN exames e ON pe.exame_id = e.id
        GROUP BY a.id
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar atendimentos:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar atendimentos.' });
    }

    res.status(200).json(rows);
  });
});

// endpoint para deletar um atendimento
app.delete('/atendimentos/:numero_atendimento', (req, res) => {
  const numeroAtendimento = req.params.numero_atendimento;

  const sqlDeleteExames = `
    DELETE FROM paciente_exames WHERE paciente_id = (SELECT id FROM atendimentos WHERE numero_atendimento = ?)
  `;

  const sqlDeleteAtendimento = `
    DELETE FROM atendimentos WHERE numero_atendimento = ?
  `;

  // Deletar os exames associados
  db.run(sqlDeleteExames, [numeroAtendimento], function (err) {
    if (err) {
      console.error('Erro ao deletar exames:', err.message);
      return res.status(500).json({ message: 'Erro ao deletar exames.' });
    }

    // Deletar o atendimento
    db.run(sqlDeleteAtendimento, [numeroAtendimento], function (err) {
      if (err) {
        console.error('Erro ao deletar atendimento:', err.message);
        return res.status(500).json({ message: 'Erro ao deletar atendimento.' });
      }

      res.status(200).json({ message: 'Atendimento deletado com sucesso!' });
    });
  });
});

// endpoint para cadastrar um exame
app.post('/exames', (req, res) => {
  const { codigo, descricao, valor } = req.body;

  // verificar se o código do exame já existe, ignorando a diferença de lower e upper case (case-sensitive)
  const sqlCheckExame = `SELECT id FROM exames WHERE LOWER(codigo) = LOWER(?)`;

  db.get(sqlCheckExame, [codigo], (err, row) => {
    if (err) {
      console.error('Erro ao verificar exame existente:', err.message);
      return res.status(500).json({ message: 'Erro ao verificar exame.' });
    }

    if (row) {
      // se o exame já existe, retorne uma mensagem de erro
      return res.status(400).json({ message: 'Exame com esse código já cadastrado.' });
    }

    // caso não exista, cadastre o novo exame
    const sql = `
            INSERT INTO exames (codigo, descricao, valor)
            VALUES (?, ?, ?)
        `;
    const params = [codigo, descricao, valor];

    db.run(sql, params, function (err) {
      if (err) {
        console.error('Erro ao salvar exame:', err.message);
        return res.status(500).json({ message: 'Erro ao salvar exame.' });
      }

      res.status(201).json({ message: 'Exame cadastrado com sucesso!', exameId: this.lastID });
    });
  });
});

// endpoint para deletar um exame
app.delete('/exames/:codigo', (req, res) => {
  const { codigo } = req.params;

  // deletar o exame
  const sqlDeleteExame = `DELETE FROM exames WHERE codigo = ?`;

  db.run(sqlDeleteExame, [codigo], function (err) {
    if (err) {
      console.error('Erro ao deletar exame:', err.message);
      return res.status(500).json({ message: 'Erro ao deletar exame.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Exame não encontrado.' });
    }

    res.status(200).json({ message: 'Exame deletado com sucesso!' });
  });
});

// endpoint para listar todos os exames cadastrados
app.get('/exames', (req, res) => {
  const sql = `SELECT codigo, descricao, valor FROM exames`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar exames:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar exames.' });
    }

    res.status(200).json(rows);
  });
});

// endpoint para verificar a existência de um exame pelo código
app.get('/exames/:codigo', (req, res) => {
  const { codigo } = req.params;

  const sqlCheckExame = `SELECT id FROM exames WHERE codigo = ?`;

  db.get(sqlCheckExame, [codigo], (err, row) => {
    if (err) {
      console.error('Erro ao verificar exame:', err.message);
      return res.status(500).json({ message: 'Erro ao verificar exame.' });
    }

    if (row) {
      res.status(200).json({ message: 'Exame encontrado.' });
    } else {
      res.status(404).json({ message: 'Exame não encontrado.' });
    }
  });
});

// endpoint para gerar o relatório geral de atendimentos
app.get('/relatorios', (req, res) => {
  const sql = `
      SELECT 
        a.numero_atendimento AS codigo_paciente, 
        a.nome_completo, 
        a.sexo, 
        a.email, 
        a.celular, 
        GROUP_CONCAT(e.codigo) AS exames,  -- Concatena os códigos dos exames
        SUM(e.valor) AS total_valor        -- Soma os valores dos exames encontrados
      FROM atendimentos a
      LEFT JOIN paciente_exames pe ON a.id = pe.paciente_id
      LEFT JOIN exames e ON pe.exame_id = e.id
      GROUP BY a.id
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar relatórios:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar relatórios.' });
    }

    res.status(200).json(rows);
  });
});

// configuração do servidor local
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});