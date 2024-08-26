const clinicModel = require('../Models/clinic')
const asyncHandler = require('express-async-handler')
const AppError = require('../AppError')
const {CLINIC_ALREADY_EXISTS, MISSING_REQUIRED_CLINIC_INFO, CANNOT_FIND_CLINIC, CANNOT_FIND_AND_DELETE_CLINIC, CANNOT_FIND_AND_UPDATE_CLINIC} = require ('../Constants/errorCodes')

const createClinic = asyncHandler(async(req, res) => {
    if(!req.body.name || !req.body.address || !req.body.phoneNumber || !req.body.city || !req.body.province || !req.body.postalCode) throw new AppError(MISSING_REQUIRED_CLINIC_INFO)

    const clinic = await clinicModel.findOne({name: req.body.name, address: req.body.address})
    if (clinic) throw new AppError(CLINIC_ALREADY_EXISTS)

    const newClinic = await clinicModel.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        fax: req.body.fax || '',
        email: req.body.email || '',
        hoursOfOperation:req.body.hoursOfOperation,
        rooms: req.body.rooms
    })
    res.status(200).json(newClinic)
})

const getClinic = asyncHandler(async (req, res) => {
    const clinic = await clinicModel.findById(req.params.id)
    if(!clinic) throw new AppError(CANNOT_FIND_CLINIC)
    res.status(200).json(clinic)
})

const getClinics = asyncHandler(async(req, res) => {
    const clinics = await clinicModel.find({})
    res.status(200).json(clinics)
})

const deleteClinic = asyncHandler(async (req, res) => {
    const clinic = await clinicModel.findByIdAndDelete(req.params.id)
    if(!clinic) throw new AppError(CANNOT_FIND_AND_DELETE_CLINIC)
    console.log(`Clinic has been deleted ${clinic}`)
    res.status(200).end()
})

const updateClinic = asyncHandler(async (req, res) => {
    const newInfo = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        fax: req.body.fax,
        email: req.body.email,
        hoursOfOperation:req.body.hoursOfOperation,
        rooms: req.body.rooms
    }
    const clinic = await clinicModel.findByIdAndUpdate(req.params.id, newInfo, {new: true})
    if(!clinic) throw new AppError(CANNOT_FIND_AND_UPDATE_CLINIC)
    console.log(`Clinic has been updated ${clinic}`)
    res.status(200).json(clinic)
})

module.exports = {createClinic, getClinic, getClinics, deleteClinic, updateClinic}