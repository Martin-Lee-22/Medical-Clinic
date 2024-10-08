import { useContext, useEffect, useState } from "react"
import { axiosPrivate } from "../api/axios"
import ModalContext from "../context/modalProvider"
import { doctor } from "../data/Types"
import { defaultDoctor } from "../data/defaultData"
import { getCookie } from "../utils/Cookies"

const useDoctors = () => {
    const [doctors, setDoctors] = useState<doctor[]>([])
    const [loading, setLoading] = useState(false)
    const [doctor, setDoctor] = useState<doctor>(defaultDoctor)

    useEffect(()=>{
        getDoctors()
    }, [])

    const getDoctors = async () => {
        setLoading(true)
        try{
            const response = await axiosPrivate.get('/doctor/')
            setDoctors(response.data.sort(function(a:doctor, b:doctor){return ('' + a.firstName).localeCompare(b.firstName)}))
        }catch(err){
            console.log('Cannot get Doctors! Problem in server or API request')
        }
        setLoading(false)
    }

    const deleteDoctor = async (id:string) => {
        try{
            await axiosPrivate.delete(`/doctor/${id}`)
            getDoctors()
        } catch(err){
            console.log('Cannot delete doctor! Problem in server or API request')
        }
    }

    const createDoctor = async (data:{}) => {
        try{
            const response = await axiosPrivate.post(`/doctor/register/`, data)
            setDoctors(response.data)
            return response.data
        } catch(err){
            console.log('Cannot create doctor! Problem in server or API request')
        }
    }

    const updateDoctor = async (id:string, data:{}):Promise<any> => {
        try{
            const response = await axiosPrivate.patch(`/doctor/${id}`, data)
            setDoctors(response.data)
            return response.data
        } catch(err){
            console.log('Cannot update doctor! Problem in server or API request')
        }
    }

    const getDoctor= async (id:string) => {
        try{
            const response = await axiosPrivate.get(`/doctor/${id}`)
            setDoctor(response.data)
        }catch(err){
            console.log('Cannot get doctor based on ID! Problem in server or API request')
        }
    }

    return {doctors, getDoctors, deleteDoctor, createDoctor, updateDoctor, getDoctor, doctor, setDoctor, loading}
}

export default useDoctors