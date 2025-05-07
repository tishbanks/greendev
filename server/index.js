
import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' })
})

app.listen(3001, () => {
  console.log('✅ API en écoute sur http://localhost:3001')
})
