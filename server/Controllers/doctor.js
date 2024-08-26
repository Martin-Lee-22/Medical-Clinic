const doctorModel = require('../Models/doctor');
const asyncHandler = require('express-async-handler');
const AppError = require('../AppError.js')
const {MISSING_REQUIRED_DOCTOR_INFO, DOCTOR_ALREADY_EXISTS, CANNOT_FIND_DOCTOR, CANNOT_FIND_AND_DELETE_DOCTOR, CANNOT_FIND_AND_UPDATE_DOCTOR} =  require('../Constants/errorCodes') 

const createDoctor = asyncHandler(async(req, res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.dob || !req.body.sex) throw new AppError(MISSING_REQUIRED_DOCTOR_INFO)
    
    const doctorExists = await doctorModel.findOne({firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, sex: req.body.sex})

    if(doctorExists) throw new AppError(DOCTOR_ALREADY_EXISTS)

    const newDoctor = await doctorModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        sex: req.body.sex,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        email: req.body.email || '',
        phoneNumber: req.body.phoneNumber || '',
        specialties: req.body.specialties || [],
        msp: req.body.msp || '',
        clinics: req.body.clinics || [],
        color: req.body.color || '#000000',
        title: req.body.title || ''
    })
    console.log(`Created New Doctor ${JSON.stringify(newDoctor)}`)
    res.status(200).json(newDoctor)
});

const getDoctors = asyncHandler(async(req, res) => {
    const doctors = await doctorModel.find({});
    console.log("Sent all Doctors")
    res.status(200).json(doctors)
})

const getDoctor = asyncHandler(async(req, res) => {
    const chosenDoctor = await doctorModel.findById(req.params.id);
    if (!chosenDoctor) throw new AppError(CANNOT_FIND_DOCTOR);
    res.status(200).json(chosenDoctor)
})

const deleteDoctor = asyncHandler(async(req, res) => {
    const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);
    if(!deletedDoctor) throw new AppError(CANNOT_FIND_AND_DELETE_DOCTOR);
    console.log(`Doctor deleted successfully: ${deletedDoctor}`)
    res.status(200).end();
})

const updateDoctor = asyncHandler(async(req, res) => {
    const newInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        sex: req.body.sex,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        email: req.body.email || '',
        phoneNumber: req.body.phoneNumber || '',
        specialties: req.body.specialties || [],
        msp: req.body.msp || '',
        clinics: req.body.clinics || [],
        color: req.body.color || '#000000',
        title: req.body.title || ''
    }

    const updateDoctor = await doctorModel.findByIdAndUpdate(req.params.id, newInfo, {new: true, runValidators: true})
    if(!updateDoctor) throw new AppError(CANNOT_FIND_AND_UPDATE_DOCTOR) 
    console.log(`Update Doctor: ${updateDoctor}`)
    res.status(200).json(updateDoctor)
})

module.exports = {createDoctor, getDoctor, getDoctors, deleteDoctor, updateDoctor}