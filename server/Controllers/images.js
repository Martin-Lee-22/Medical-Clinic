const imageModel = require('../Models/Images')
const asyncHandler = require('express-async-handler')
const AppError = require('../AppError')

const createUpdateImage = asyncHandler(async(req, res) => {
    const filter = {source: req.body.source}
    const update = {image: req.body.image}
    const image = await imageModel.findOneAndUpdate(filter, update, {
        new:true,
        upsert: true
    })
    if(!image) console.log('Cannot or create or update image!')
    res.status(200).json(image)
})

const getImage = asyncHandler(async (req, res) => {
    const image = await imageModel.findOne({source: req.params.id})
    if(!image) console.log('No image found!')
    res.status(200).json(image)
})

module.exports = {createUpdateImage, getImage}