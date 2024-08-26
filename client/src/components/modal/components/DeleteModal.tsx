import './ModalButtons.css'
import './DeleteModal.css'
import useModal from '../../../hooks/useModal'
import { useContext, useState } from 'react'
import ModalContext from '../../../context/modalProvider'
import Loading from '../../Loading/Loading'

const DeleteModal = () => {
    const {type, data} = useContext(ModalContext)
    const {closeModal, deleteRecord} = useModal()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return(
        <div className='delete_modal_container'>
            {isLoading && <Loading/> }
            <h3>Are you sure you want to Delete?</h3>
            <div className='delete_modal_buttons_container'>
                <input type='submit' className='modal_buttons' value={'Confirm'} onClick={()=>deleteRecord(type, data._id)}/>
                <button className='modal_buttons' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteModal