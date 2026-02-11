import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos', // Insira sua senha do banco de dados aqui
  database: 'web_03mb' // Ajuste para o nome do seu banco
})

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err)
    return
  }
  console.log('Conectado ao banco de dados MySQL')
})

app.post('/products_firmado', (req, res) => {
  const { name, price, description, category } = req.body

  const query = `
    INSERT INTO products_firmado (name, price, description, category)
    VALUES (?, ?, ?, ?)
  `
  const values = [name, price, description, category]

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao salvar produto:', err)
      res.status(500).json({
        message: 'Erro ao salvar produto',
        error: err
      })
      return
    }

    res.status(201).json({
      message: 'Produto salvo com sucesso',
      id: results.insertId
    })
  })
})
app.get('/products_firmado', (req, res) => {
  const query = 'SELECT name, price, description, category FROM products_firmado'

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err)
      res.status(500).json({
        message: 'Erro ao buscar produtos',
        error: err
      })
      return
    }

    res.status(200).json(results)
  })
})

const PORT = 5501

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})