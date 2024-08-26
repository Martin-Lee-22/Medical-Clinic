import { useContext } from "react"
import ModalContext from "../context/modalProvider"
import usePatients from "./usePatients"
import { Pages } from "../data/Pages"
import useClinics from "./useClinics"
import useDoctors from "./useDoctors"
import useAppointments from "./useAppointments"

const useModal = () => {
    const {setShowModal, setData, data, setType, setIsDelete, callApi} = useContext(ModalContext)
    const {deletePatient} = usePatients()
    const {deleteClinic} = useClinics()
    const {deleteDoctor} = useDoctors()
    const {deleteAppointment} = useAppointments()
    
    const openModal = (type:string, data:{}) => {
        setType(type)
        setData(data)
        setShowModal(true)
    }

    const closeModal = () => {
        callApi()
        setType('')
        setData({})
        setShowModal(false)
        setIsDelete(false)
    }

    const cancelModal = () => {
        setType('')
        setData({})
        setShowModal(false)
        setIsDelete(false)
    }

    const deleteModal = (type:string, data:{}) => {
        setIsDelete(true)
        setData(data)
        setType(type)
        setShowModal(true)
    }

    const deleteRecord = (type:string, data_id:string) => {
        if(data){
            switch(type){
                case Pages.Patient:
                    deletePatient(data_id)
                    callApi()
                    break;
                case Pages.Clinic:
                    deleteClinic(data_id)
                    callApi()
                    break;
                case Pages.Doctor:
                    deleteDoctor(data_id)
                    callApi()
                    break;
                case Pages.Appointment:
                    deleteAppointment(data_id)
                    callApi()
                    break;
            }
        }
        closeModal()
    }





    return {openModal, closeModal, deleteRecord, deleteModal, cancelModal}
}

export default useModal