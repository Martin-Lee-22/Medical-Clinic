import { useContext, useState } from 'react'
import './DeleteAppointment.css'
import useModal from '../../../../hooks/useModal'
import ModalContext from '../../../../context/modalProvider'
const DeleteAppointment = (props:any) => {
    const [show, setShow] = useState(false)
    const {type, data} = useContext(ModalContext)
    return(
        <>
            <div id='delete_appointment_container'>
                    <span>Delete Appointment</span>
                    <button type='button' onClick={()=>{setShow(!show)}}><img src='trash.png' alt='delete appointment'/></button>
            </div>
            {show &&
                <div id='delete_appointment_modal_overlay'>
                    <div id='delete_appointment_modal_container'>
                        <h3>Are you sure you want to delete?</h3>
                        <div id='delete_modal_buttons_container'>
                            <input type='submit' className='modal_buttons' value={'Confirm'} onClick={()=>{props.deleteRecord(type, data._id)}}/>
                            <button className='modal_buttons' onClick={()=>{setShow(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default DeleteAppointment