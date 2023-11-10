import express from 'express'
const router = express.Router()
import { callbackHandler, mainPanel, replySameMessage } from '../controllers/botControllers.js'

const messageHandler = async (req, res) => {
  const MY_ID = process.env.MY_CHAT_ID
  const { callback_query, message } = req.body

  if (callback_query) {
    await callbackHandler(callback_query)
  } else {
    if (message.text === '/help') {
      await mainPanel()
    } else {
      await replySameMessage(message.from.id, message.text)
    }
  }
  res.status(204).send('')
}

router.route('/')
  .post(messageHandler)

export default router