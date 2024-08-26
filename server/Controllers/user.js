const bcrypt = require("bcrypt");
const userModel = require('../Models/user.js');
const asyncHandler = require('express-async-handler')
const { USER_ALREADY_EXISTS, MISSING_USER_INFO, CANNOT_FIND_USER, CANNOT_FIND_AND_UPDATE_USER, CANNOT_FIND_AND_DELETE_USER } = require('../Constants/errorCodes.js');
const AppError = require('../AppError.js')

const createUser = asyncHandler(async (req, res) => {
        if (!req.body.name || !req.body.email || !req.body.password) {
                throw new AppError(MISSING_USER_INFO);
            }
        
        const userExist = await userModel.findOne({email: req.body.email});
        if (userExist) {
            throw new AppError(USER_ALREADY_EXISTS);
        }

        //Hash password
        const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }
        await userModel.create(newUser);
        delete newUser.password
        console.log("Succcess! Created new user!")
        res.status(201).send(newUser)
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find({});
    console.log("Sent all users!")
    res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) throw new AppError(CANNOT_FIND_USER)
    console.log(`User Found: ${foundUser}`)
    res.status(200).json(foundUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) throw new AppError(CANNOT_FIND_AND_DELETE_USER)
    console.log(`User Deleted: ${deletedUser}`)
    res.status(202).end();
});

const updateUser = asyncHandler(async (req, res) => {
    var newInfo = {};
    const oldUserInfo = await userModel.findById(req.params.id)
    
    if(req.body.firstName && oldUserInfo.firstName !== req.body.firstName) newInfo.firstName = req.body.firstName;
    if(req.body.lastName && oldUserInfo.lastName !== req.body.lastName) newInfo.lastName = req.body.lastName;
    if(req.body.email && oldUserInfo.email !== req.body.email) newInfo.email = req.body.email;
    if(req.body.password && oldUserInfo.password !== req.body.password) newInfo.password = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));

    // Will return updated document due to 'new:true'
    const updateUser = await userModel.findByIdAndUpdate(req.params.id, newInfo, {new:true});
    if(!updateUser) throw new AppError(CANNOT_FIND_AND_UPDATE_USER)

    console.log(`Updated user: ${updateUser}`)
    res.status(202).json(updateUser);
});

module.exports = {createUser, getUsers, getUser, deleteUser, updateUser}