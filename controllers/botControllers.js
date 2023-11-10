import bot from '../bot/index.js'

const replySameMessage = async (id, text) => {
  await bot.sendMessage(id, text)
}

const mainPanel = async () => {
  await bot.sendMessage('759263763', '功能表', {
    reply_markup:{
      inline_keyboard: [
        [
          { text: '查詢六角報名人數', callback_data: 'hex' },
          { text: '近15天點擊數變化', callback_data: 'shopee' }
        ]
      ]
    }
  })
}

const fetchShopeeReport = async () => {
  let str = ''
  const fetch_response = await fetch('https://affiliate.shopee.tw/api/v3/dashboard/detail?start_time=1698249600&end_time=1699545599', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Cookie: process.env.COOKIE
    }
  })
  const { data: { list } } = await fetch_response.json()
  if (list) { 
    list.forEach(day => {
      str += day.ymd + ': ' + day.clicks + '\n'
    })
    return str
  } else {
    return `error`
  }
}

const fetchHex = async () => {
  const fetch_response = await fetch('https://api-2023.thef2e.com/v1/competition/signup-info')
  const result = await fetch_response.json()
  return `六角學院報名現況: 總報名人數: ${ result?.total_users }, 團體組: ${ result?.team_count }, 個人組: ${ result?.individual_count }`
}

const callbackHandler = async ({ from, data }) => {
  const obj = {
    hex: fetchHex,
    shopee: fetchShopeeReport
  }
  const text = await obj[data]()
  await bot.sendMessage('759263763', text)
}

export {
  mainPanel,
  callbackHandler,
  replySameMessage
}