const { rateLimit } = require('express-rate-limit')

const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
    message: {message: 'Too many login attempts! please try again after 60 seconds'},
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	handler: (req, res, next, options) =>
		res.status(options.statusCode).send(options.message),
})

module.exports = loginLimiter