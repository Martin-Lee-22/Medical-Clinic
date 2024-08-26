import './SearchInput.css'
import useModal from '../../hooks/useModal'

type propTypes = {
    pageType: string
}

const AddButton = (props:propTypes) => {
    const {openModal} = useModal()
    return(
        <div className="add_outer_container" onClick={()=>{openModal(props.pageType, {})}}>
            <div className='add_container'>
                <span>&#43;</span>
                <span>Add</span>
            </div>
        </div>
    )
}

export default AddButton