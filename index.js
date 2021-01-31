const express = require('express')
const ejs = require('ejs')
const data = require('./data')

const PORT = 4018

const app = express()

// app.engine('html', () => {
//   // Engine ni o'zimiz yozishimiz mumkin
// })

app.engine('html', ejs.renderFile)

app.set('view engine', 'html')

app.use(express.static('static'))

// app.set('views', 'src/views')

app.get('/', (_, res) => {
  res.render('index', data)
})

app.get('/:id?', (req, res) => {
  let { id } = req.params
  if (id > data.receipts.length || isNaN(id)) {
    res.send('Error')
  } else {
    const [receipt] = data.receipts.filter(receipt => receipt.id === Number(id))
    res.render('receipt', receipt)
  }
})

//view/:id?/*

app.listen(process.env.PORT || PORT, () => console.log(PORT))