const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const user = require('./routes/user')
const restaurant = require('./routes/restaurant')
const item = require('./routes/item')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', user)
app.use('/api', restaurant)
app.use('/api', item)

app.get('/', (req, res) => {
    res.json({ message: 'App is running'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})