import { useEffect, useState } from "react"
import { axiosPrivate } from "../api/axios"
import { clinics } from "../data/Types"
import { defaultClinic } from "../data/defaultData"

const useClinics = () => {
    const [clinics, setClincs] = useState([])
    const [loading, setLoading]= useState(false)
    const [clinic, setClinic] = useState<clinics>(defaultClinic)

    useEffect(() => {
        getClinics()
    }, [])

    const getClinics = async () => {
        setLoading(true)
        try{
            const response = await axiosPrivate.get('/clinics')
            setClincs(response.data.sort(function(a:clinics, b:clinics){return ('' + a.name).localeCompare(b.name)}))
        }catch(err){
            console.log('Cannot get Clinics! Problem in server or API request')
        }
        setLoading(false)
    }

    const getClinic = async(id:string) => {
        try{
            const response = await axiosPrivate.get(`/clinics/${id}`)
            setClinic(response.data)
        } catch(err){
            console.log(`Cannot get Clinic! Error: ${err}`)
        }
    }

    const deleteClinic = async (id:string) => {
        try{
            await axiosPrivate.delete(`/clinics/${id}`)
        } catch(error){
            console.log('Cannot delete clinic!: ' + error)
        }
    }

    return {clinics, getClinics, deleteClinic, getClinic, clinic, setClinic, loading}
}

export default useClinics