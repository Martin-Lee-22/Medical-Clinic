import {useContext, useState } from 'react'
import './AppointmentModal.css'
import usePatients from '../../../hooks/usePatients'
import {add, format } from 'date-fns'
import PatientInput from './components/PatientInput'
import DeleteAppointment from './components/DeleteAppointment'
import useModal from '../../../hooks/useModal'
import { Pages } from '../../../data/Pages'
import useAppointments from '../../../hooks/useAppointments'
import ModalContext from '../../../context/modalProvider'
import { time } from '../../../data/Types'
import { convertTime12to24 } from '../../../utils/helperFunctions'
import ThemeContext from '../../../context/ThemeProvider'

const AppointmentModal = (props: any) =>{
    const clinicID = props.clinicID
    const [complete, setComplete] = useState( props.complete || false)
    const [description, setDescription] = useState(props.description || '')
    const doctorID = props.doctorID
    const endDate = props.endDate
    const [paid, setPaid] = useState(props.paid || false)
    const [patientID, setPatientID] = useState(props.patientID || '')
    const [patientName, setPatientName] = useState(props.patientName || '')
    const [price, setPrice] = useState(props.price || 0)
    const startDate = props.startDate || new Date()
    const {patients} = usePatients()
    const {closeModal, deleteRecord} = useModal()
    const {createAppointment, updateAppointment} = useAppointments()

    const [textAreaSelected, setTextAreaSelected] = useState(false)
    const [endTime, setEndTime] = useState(props.availableTimes[0])

    const {darkMode} = useContext(ThemeContext)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            clinicID: clinicID,
            complete: complete,
            description: description,
            doctorID: doctorID,
            endDate: endDate.setHours(convertTime12to24(endTime.hour, endTime.meridiem), endTime.minute),
            startDate: startDate,
            paid: paid,
            patientID: patientID,
            patientName: patientName,
            price: price,
        }
        try{
            if(props._id) {
                await updateAppointment(props._id, data)
            } else {
                await createAppointment(data)
            }
            closeModal()
        } catch(error){
            console.log("Cannot Create Appointment!")
            console.log(`Error: ${error}`)
        }
    }

    return(
    <div className='appointment_modal_container' id={darkMode ? 'dark_appointment_modal_container':''}>
        <form className='modal_input_container input_modal_container' id="appointment_form" onKeyDown={(e) => { (e.key === 'Enter' && !textAreaSelected) && e.preventDefault(); }} onSubmit={handleSubmit}>
            <div className='appointment_doctor_modal'>
                <span>Doctor:</span>
                <br/>
                <span>{props.doctorName}</span>
            </div>
            <PatientInput patients={patients} setPatientID={setPatientID} patientID={patientID} setPatientName={setPatientName}/>
            <div id='appointment_start_end_date'>
                <div>
                    <h4>
                        {format(startDate, 'EEEE, MMMM d')}
                        <br/>
                        {format(startDate, 'p')}
                    </h4>
                </div>
                <img src='right_arrow.png' alt='arrow from start to end date'/>
                <div>
                    <h4>
                        {format(endDate, 'EEEE, MMMM d')}
                    </h4>
                    <select onChange={(e)=>{setEndTime(props.availableTimes[e.target.selectedIndex])}}>
                        {props.availableTimes.map((time:time, index:number)=>{return <option value={index} key={index}>{`${time.hour}:${time.minute === 0 ? '00' : '30'} ${time.meridiem}`}</option>})}
                    </select>
                </div>
            </div>
            <div id='appointment_price_container'>
                <label htmlFor='price'>Price:</label>
                <br/>
                <input type="number" onBlur={()=>{setPrice(Math.round(price * 100) / 100)}} id='price' onChange={(e)=>{setPrice(e.target.value)}} value={price} onFocus={()=>{if(price === 0) setPrice('')}} placeholder="0.00"/> 
            </div>
            <DeleteAppointment deleteRecord={deleteRecord}/>
            <div id='description_container'>
                <label htmlFor='description'>Description:</label>
                <br/>
                <textarea id='description' value={description} onBlur={()=>{setTextAreaSelected(false)}} onFocus={()=>{setTextAreaSelected(true)}} onChange={(e)=>{setDescription(e.target.value)}} name='description'/>
            </div>
        </form>
    </div>)
}

export default AppointmentModal