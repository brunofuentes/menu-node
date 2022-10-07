require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const restaurant = require('./routes/restaurant')
const item = require('./routes/item')
const path = require('path')
const cors = require('cors')
const allowedOrigins = require('./config/allowedOrigins')
const passport = require('passport')

const app = express()

app.use(cors(allowedOrigins))
app.use(passport.initialize())

require('./config/passport')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', user)
app.use('/api', restaurant)
app.use('/api', item)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server' })
})

app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
	return res.status(200).send({
		success: true,
		user: {
			id: req.user.id,
		},
	})
})

app.get('/api/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
	req.logout((err) => {
		if (err) {
			return err
		}
		res.redirect('/')
		console.log('testing')
		return res.status(200).send({
			success: true,
			message: 'User successfully logged out',
		})
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
