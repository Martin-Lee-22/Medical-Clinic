import './ModalButtons.css'
import useModal from '../../../hooks/useModal'
import { useContext, useEffect, useState } from 'react'
import ModalContext from '../../../context/modalProvider'
import { Pages } from '../../../data/Pages'

const ModalButtons = () => {
    const {type, data} = useContext(ModalContext)
    const {cancelModal} = useModal()
    const [form, setForm] = useState('')

    useEffect(()=>{
        switch (type) {
            case Pages.Clinic:
                setForm('clinic_form')
                break;
            case Pages.Patient:
                setForm('patient_form')
                break;
            case Pages.Doctor:
                setForm('doctor_form')
                break;
            case Pages.Appointment:
                setForm('appointment_form')
                break;
            default:
                setForm('')
        }
    }, [type])
    return(
        <div className="modal_buttons_container">
            <input type="submit" value="Save" className={"save_submit_button modal_buttons"} form={form}/>
            <button className="cancel_button modal_buttons" onClick={cancelModal}>Cancel</button>
        </div>
    )
}

export default ModalButtons