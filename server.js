import express from 'express'
import path from 'node:path'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import credentials from './middleware/credentials.js'
import rootRoute from './routes/root.js'
import healthzRoute from './routes/healthz.js'
import botRoute from './routes/bot.js'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 3000

const app = express()

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', rootRoute)
app.use('/healthz', healthzRoute)
app.use('/bot', botRoute)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));