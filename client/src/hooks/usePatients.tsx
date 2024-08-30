import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useContext, useEffect, useState } from "react"
import ModalContext from "../context/modalProvider"
import { patient } from "../data/Types"

const usePatients = () => {
    const [patients, setPatients] = useState<patient[]>([])
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();

    const controller = new AbortController();

    useEffect(()=>{
        getPatients()
    }, [])

    const getPatients = async () =>{
        setLoading(true)
        try{
            const response = await axiosPrivate.get('/patients/', {
                signal: controller.signal // Will allow to cancel request if need be.
            })
            setPatients(response.data)
        }catch(err){
            console.log('Cannot get Patients! Problem in server or API request')
        }
        setLoading(false)
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
        setLoading(true)
        try{
            await axiosPrivate.delete(`/patients/${id}`,{
                signal: controller.signal
            })
            getPatients()
        } catch (error){
            console.log('Cannot delete patient!')
        }
        setLoading(false)
    }

    return {patients, getPatients, deletePatient, setPatients, getPatientsViaClinicID, loading}
}

export default usePatients