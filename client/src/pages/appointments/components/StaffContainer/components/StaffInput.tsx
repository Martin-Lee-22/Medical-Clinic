import './StaffInput.css'

type StaffInputType = {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const StaffInput = (props: StaffInputType) =>  {
    return(
        <div className='staff_input_container'>
            <img src='search_grey.png' alt='search staff'/>
            <input type='search' placeholder='Search Doctors...' onChange={(e)=>{props.setSearch(e.target.value)}}/>
        </div>
    )
}

export default StaffInput