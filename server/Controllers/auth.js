const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('../Models/user.js');
const asyncHandler = require('express-async-handler')
const AppError = require('../AppError.js')

// @desc Login
// @route POST/auth/login
// @access Public
const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: 'Email and Password are required to login'})
    }

    const foundUser = await userModel.findOne({email:req.body.email})
    if(!foundUser){
        return res.status(401).json({type: 1, message: 'Sorry, we cant find an account with this email address. Please try again or create a new account.'})
    }

    const match = await bcrypt.compare(password, foundUser.password)
    if(!match) return res.status(401).json({type: 2, message: 'Incorrect password. Please try again or create a new account.'})

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5s'}
    )

    const refreshToken = jwt.sign(
        {"email": foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    // Create secure cookie with refresh token that will be attached to the response header
    res.cookie('token', refreshToken, {
        httpOnly: true, // accessible only be web server
        secure: true, // https
        sameSite: 'None', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry: 7 days
    })

    const user = foundUser.toJSON()
    delete user.password
    const info = {
        "user": user,
        'accessToken': accessToken
    }

    console.log("Successfully Logged in!")
    res.json(info)
})

// @desc Refresh
// @route GET/auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async(req, res) => {
    const cookies = req.cookies

    if(!cookies?.token) return res.status(401).json({message: 'Unauthorized'})
    
    const refreshToken = cookies.token

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await userModel.findOne({email: decoded.email})

            if(!foundUser) return res.status(401).json({message: 'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
            )
            res.json({accessToken})
        })
    )
})

// @desc Logout
// @route POST/auth/logout
// @access Public - just to clear cookie if exists
const logout = asyncHandler(async(req, res) => {
    const cookies = req.cookies
    if(!cookies?.token) return res.sendStatus(204) // No content
    res.clearCookie('token', {httpOnly: true, sameSite: 'None', secure: true})
    console.log('You have Sucessfully logged out')
    res.sendStatus(204);
})


module.exports = {login, refresh, logout}