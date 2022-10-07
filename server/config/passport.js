const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
const User = require('../models').User

const { PRIVATE_KEY } = require('../utils/constants')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = PRIVATE_KEY
passport.use(
	new JwtStrategy(opts, async function (jwt_payload, done) {
		let user = await User.findOne({ where: { email: jwt_payload.email } })
		if (!user) {
			return done(err, false)
		}
		if (user) {
			return done(null, user)
		} else {
			return done(null, false)
		}
	})
)
