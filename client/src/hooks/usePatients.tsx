import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useContext, useEffect, useState } from "react"
import ModalContext from "../context/modalProvider"
import { patient } from "../data/Types"

const usePatients = () => {
    const [patients, setPatients] = useState<patient[]>()
    const axiosPrivate = useAxiosPrivate();

    const controller = new AbortController();

    useEffect(()=>{
        getPatients()
    }, [])

    const getPatients = async () =>{
        try{
            const response = await axiosPrivate.get('/patients/', {
                signal: controller.signal // Will allow to cancel request if need be.
            })
            setPatients(response.data)
        }catch(err){
            console.log('Cannot get Patients! Problem in server or API request')
        }
    }

    const getPatientsViaClinicID = async (clinicID:string) => {
        try{
            const response = await axiosPrivate.get(`/patients/query?clinicID=${clinicID}`)
            setPatients(response.data)
        } catch(err){
            console.log('Cannot get Patients via Doctor ID!')
        }
    }

    const deletePatient = async (id:string) => {
        try{
            await axiosPrivate.delete(`/patients/${id}`,{
                signal: controller.signal
            })
            console.log('Patient deleted!')
            getPatients()
        } catch (error){
            console.log('Cannot delete patient!')
        }
    }

    return {patients, getPatients, deletePatient, setPatients, getPatientsViaClinicID}
}

export default usePatients