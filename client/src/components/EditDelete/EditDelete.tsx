import useModal from "../../hooks/useModal"
import './EditDelete.css'
type propsType = {
    type: string,
    data: {},
    openModal:(type:string, data:{})=>void, 
    deleteModal: (type:string, data:{})=>void, 
}

const EditDelete = (props:propsType) => {
    return(
        <div className='edit_delete_button_container'>
                <img src='edit_3.png' onClick={()=>{props.openModal(props.type, props.data)}} alt='edit icon'/>
                <img src='trash.png' alt='trash icon' onClick={()=>{props.deleteModal(props.type, props.data)}}/>
        </div>
    )
}

export default EditDelete