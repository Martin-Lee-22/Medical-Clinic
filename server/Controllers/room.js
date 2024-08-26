const roomModel = require('../Models/room')
const asyncHandler = require('express-async-handler');
const AppError = require('../AppError.js')
const {MISSING_REQUIRED_ROOM_INFO, ROOM_ALREADY_EXISTS, CANNOT_FIND_ROOM, CANNOT_FIND_AND_DELETE_ROOM, CANNOT_FIND_AND_UPDATE_ROOM} =  require('../Constants/errorCodes') 

const createRoom = asyncHandler(async(req, res) => {
    const foundRoom = await roomModel.findOne({name: req.body.name, clinicId: req.body.clinicID})
    if(foundRoom) throw new AppError(ROOM_ALREADY_EXISTS)

    if(!req.body.name || !req.body.clinicID) throw new AppError(MISSING_REQUIRED_ROOM_INFO)

    const newRoom = {
        name: req.body.name || '',
        clinicID: req.body.clinicID || null,
        occupied: req.body.occupied || false
    }
    const room = await roomModel.create(newRoom)
    res.status(200).json(room)
})

const getRooms = asyncHandler(async(req, res) => {
    const rooms = await roomModel.find({})
    res.status(200).json(rooms)
})

const getRoom = asyncHandler(async(req, res) => {
    const room = await roomModel.findById(req.params.id)
    if (!room) throw new AppError(CANNOT_FIND_ROOM)
    res.status(200).json(room)
})

const deleteRoom = asyncHandler(async(req, res) => {
    await roomModel.findByIdAndDelete(req.params.id)
    console.log("Room has been deleted!")
    res.status(200).end()
})

const updateRoom = asyncHandler(async(req, res) => {
    const newInfo = {
        name: req.body.name || '',
        clinicID: req.body.clinicID || null,
        occupied: req.body.occupied || false
    }
    const room = await roomModel.findByIdAndUpdate(req.params.id, newInfo, {new: true})
    res.status(200).json(room)
})

module.exports = {createRoom, getRooms, getRoom, deleteRoom, updateRoom}