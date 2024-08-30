import { useEffect, useState } from "react"
import { axiosPrivate } from "../api/axios"
import { appointment } from "../data/Types"
import { addDays } from "date-fns"

const useAppointments = () => {
    const [appointments, setAppointments] = useState<appointment[]>([])

    const getAppointments = async () =>{
        try{
            const response = await axiosPrivate.get('/appointments')
            setAppointments(response.data)
        } catch(err){
            console.log(`Cannot get appointments: ${err}`)
        }
    }

    const getAppointmentsPatientID = async (patientID: string) => {
        try{
            const response = await axiosPrivate.get(`/appointments/query?patientID=${patientID}`)
            setAppointments(response.data)
        } catch(err){
            console.log('Cannot get appointments based on patientID: ${err}')
        }
    }

    const getAppointmentsDateClinicDoctorID = async(clinicID:string, doctorID:string, startDate:Date, endDate:Date) =>{
        try{
            const response = await axiosPrivate.get(`/appointments/query?clinicID=${clinicID}&doctorID=${doctorID}&startDate=${startDate}&endDate=${addDays(endDate, 1)}`)
            setAppointments(response.data)
            }catch(err){
            console.log(`Cannot get appointments based on Clinic and Doctor: ${err}`)
            }
    }

    const createAppointment = async (data:{}) => {
        try{
            await axiosPrivate.post('/appointments/register', data)
            getAppointments()
        } catch(err){
            console.log(`Cannot create Appointment: ${err}`)
        }
    }

    const updateAppointment = async (id:string,data:{}) => {
        try{
            await axiosPrivate.patch(`/appointments/${id}`, data)
            getAppointments()
        } catch(err){
            console.log(`Cannot update Appointment: ${err}`)
        }
    }

    const deleteAppointment = async (id:string) => {
        try{
            await axiosPrivate.delete(`/appointments/${id}`)
        } catch(err){
            console.log('Cannot delete appointment! Problem in server or API request. Error: ' + err)
        }  
    }
    
    return {appointments, setAppointments, deleteAppointment, createAppointment, updateAppointment, getAppointmentsDateClinicDoctorID, getAppointmentsPatientID}
}

export default useAppointments