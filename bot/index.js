import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token)

export default bot