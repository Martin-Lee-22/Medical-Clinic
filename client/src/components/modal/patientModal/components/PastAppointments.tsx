import useAppointments from '../../../../hooks/useAppointments'
import './PastAppointments.css'
import {appointment, doctor} from '../../../../data/Types'
import { format } from 'date-fns'
import useDoctors from '../../../../hooks/useDoctors'
import { useContext, useEffect } from 'react'
import ThemeContext from '../../../../context/ThemeProvider'

type pastAppointmentTypes = {
    appointments: appointment[]
}

const PastAppointments = (props:pastAppointmentTypes) => {
    const {darkMode} = useContext(ThemeContext)
    return(
        <div className='past_appointment_container' id={darkMode ? 'dark_past_appointment_container':''}>
            {props.appointments.map((appointment, index)=>{
                return (
                    <div key={index} className='past_appointment'>
                        <span>{format(appointment.startDate, 'PPP')}</span>
                    </div>   
                )
            })}       
        </div>
    )
}

export default PastAppointments