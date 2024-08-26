import { format } from 'date-fns'
import { appointment } from '../../../../../data/Types'
import './Appointment.css'
import { Pages } from '../../../../../data/Pages'
import { differenceInMinutes } from 'date-fns'

type AppointmentType = {
    appointment:appointment, 
    openModal: (type:string, data:{})=>void,
    color:string
}

const containerHeight = 105

const Appointment = (props:AppointmentType) =>{
    const startTime = format(props.appointment.startDate, 'p') || ''
    const endTime = format(props.appointment.endDate, 'p') || ''
    const diffMinutes = differenceInMinutes(props.appointment.endDate, props.appointment.startDate)/30
    const patientName = props.appointment.patientName || ''

    return(
        <div className='appointment_container' style={{height:`${diffMinutes * containerHeight}px`, backgroundColor: `${props.color}`}} onClick={()=>{props.openModal(Pages.Appointment, props.appointment);}}>
            <h5>{startTime} - {endTime}</h5>
            <h6>{patientName} - {props.appointment.description}</h6>
        </div>
    )
}

export default Appointment