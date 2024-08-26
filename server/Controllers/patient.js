const patientModel = require('../Models/patient')
const asyncHandler = require('express-async-handler');
const AppError = require('../AppError.js')
const {MISSING_REQUIRED_PATIENT_INFO, PATIENT_ALREADY_EXISTS, CANNOT_FIND_PATIENT, CANNOT_FIND_AND_DELETE_PATIENT, CANNOT_FIND_AND_UPDATE_PATIENT} =  require('../Constants/errorCodes')
const mongoose = require('mongoose');

const createPatient = asyncHandler(async(req, res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.dob || !req.body.sex) throw new AppError(MISSING_REQUIRED_PATIENT_INFO)

    const foundPatient = await patientModel.findOne({firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, phn: req.body.phn})
    if (foundPatient) throw new AppError(PATIENT_ALREADY_EXISTS)

    const newInfo = {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        phoneNumber: req.body.phoneNumber || '',
        email: req.body.email || '',
        dob: req.body.dob || null,
        address: req.body.address || '',
        city: req.body.city || '',
        province: req.body.province || '',
        postalCode: req.body.postalCode || '',
        sex: req.body.sex || '',
        conditions: req.body.conditions || [],
        medications: req.body.medications || [],
        insurance: req.body.insurance || '',
        creditCard: req.body.creditCard || '',
        phn: req.body.phn || '',
        clinics : req.body.clinics || []
    }
    const patient = await patientModel.create(newInfo)
    console.log(`Created patient ${patient}`)
    res.status(200).json(patient)
})

const getPatients = asyncHandler(async(req, res) => {
    const patients = await patientModel.find({})
    res.status(200).json(patients)
})

const getPatient = asyncHandler(async(req, res) => {
    const patient = await patientModel.findById(req.params.id)
    if(!patient) throw new AppError(CANNOT_FIND_PATIENT)
    res.status(200).json(patient)
})

const getPatientsViaClinicID = asyncHandler(async(req, res) => {
    let newClinicID = new mongoose.Types.ObjectId(req.query.clinicID);
    const queries = {
        clinics: {$in: newClinicID},
    }
    const patients = await patientModel.find(queries)
    if(!patients) throw new AppError(CANNOT_FIND_PATIENT)
    res.status(200).json(patients)
})

const updatePatient = asyncHandler(async(req, res) =>{
    const patient = await patientModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!patient) throw new AppError(CANNOT_FIND_AND_UPDATE_PATIENT)
    console.log(`patient updated successfully`)
    res.status(200).json(patient)
})

const deletePatient = asyncHandler(async(req,res) => {
    const patient = await patientModel.findByIdAndDelete(req.params.id)
    if(!patient) throw new AppError(CANNOT_FIND_AND_DELETE_PATIENT)
    console.log(`patient deleted successfully`)
    res.status(200).end()
})

module.exports = {createPatient, getPatients, getPatient, updatePatient, deletePatient, getPatientsViaClinicID}