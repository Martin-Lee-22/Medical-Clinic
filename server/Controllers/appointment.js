const appointmentModel = require('../Models/appointment');
const asyncHandler = require('express-async-handler');
const AppError = require('../AppError.js')
const {MISSING_REQUIRED_APPOINTMENT_INFO, APPOINTMENT_ALREADY_EXISTS, CANNOT_FIND_APPOINTMENT, CANNOT_FIND_AND_DELETE_APPOINTMENT, CANNOT_FIND_AND_UPDATE_APPOINTMENT} =  require('../Constants/errorCodes') 
const mongoose = require('mongoose');

const createAppointment = asyncHandler(async(req, res) => {
    const foundAppointment = await appointmentModel.findOne({startDate: req.body.startDate, endDate: req.body.endDate, doctorID: req.body.doctorID})
    if (foundAppointment) throw new AppError(APPOINTMENT_ALREADY_EXISTS)

    if(!req.body.startDate || !req.body.endDate || !req.body.doctorID || !req.body.patientID ||
         !req.body.clinicID) throw new AppError(MISSING_REQUIRED_APPOINTMENT_INFO)
    
    const newInfo = {
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        doctorID: req.body.doctorID || null,
        patientID: req.body.patientID || null,
        patientName: req.body.patientName || '',
        clinicID: req.body.clinicID || null,
        description: req.body.description || '',
        complete: req.body.complete || false,
        paid: req.body.paid || false,
        price: req.body.price || 0
    }
    const appointment = await appointmentModel.create(newInfo)

    res.status(200).json(appointment)
})

const getAppointments = asyncHandler(async(req, res) => {
    const appointments = await appointmentModel.find({}).sort({startDate: 1})
    res.status(200).json(appointments)
})

const getAppointment = asyncHandler(async(req, res) => {
    const appointment = await appointmentModel.findById(req.params.id)
    if (!appointment) throw new AppError(CANNOT_FIND_APPOINTMENT)
    res.status(200).json(appointment)
})

const getAppointmentsByDateClinicDoctorID = asyncHandler(async(req, res, next) => {
    if(req.query.patientID) return next()
        if(req.query.clinicID && req.query.doctorID && req.query.startDate){
            const queries = {
                clinicID: req.query.clinicID,
                doctorID: req.query.doctorID,
                startDate: {$gte: req.query.startDate, $lte: req.query.endDate }
            }
            const appointment = await appointmentModel.find(queries).sort({startDate: 1})
            if (!appointment) throw new AppError(CANNOT_FIND_APPOINTMENT)
                res.status(200).json(appointment)
        }
})

const getAppointmentsByPatientID = asyncHandler(async(req, res) => {
    const queries = {
        patientID: req.query.patientID,
    }
    const appointment = await appointmentModel.find(queries).sort({startDate: 1})
    if (!appointment) throw new AppError(CANNOT_FIND_APPOINTMENT)
        res.status(200).json(appointment)
})

const deleteAppointment = asyncHandler(async(req, res) => {
    const appointment = await appointmentModel.findByIdAndDelete(req.params.id)
    if(!appointment) throw new AppError(CANNOT_FIND_AND_DELETE_APPOINTMENT)
    console.log(`appointment deleted successfully`)
    res.status(200).end()
})

const updateAppointment = asyncHandler(async(req, res) => {
    const objectDoctorID = new mongoose.Types.ObjectId(req.body.doctorID);
    const objectPatientID = new mongoose.Types.ObjectId(req.body.patientID);
    const objectClinicID = new mongoose.Types.ObjectId(req.body.clinicID);
    const newReqBody = {...req.body, doctorID: objectDoctorID, patientID: objectPatientID, clinicID: objectClinicID}
    
    const appointment = await appointmentModel.findByIdAndUpdate(req.params.id, newReqBody, {new: true, runValidators: true})
    if(!appointment) throw new AppError(CANNOT_FIND_AND_UPDATE_APPOINTMENT)
    console.log(`appointment updated successfully`)
    res.status(200).json(appointment)
})

module.exports = {createAppointment, getAppointments, getAppointmentsByPatientID, getAppointment, deleteAppointment, updateAppointment, getAppointmentsByDateClinicDoctorID}