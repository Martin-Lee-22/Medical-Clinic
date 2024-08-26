import { useContext, useEffect, useState } from 'react'
import './Staff.css'
import useImages from '../../../../../hooks/useImages'
import { doctor } from '../../../../../data/Types'
import ThemeContext from '../../../../../context/ThemeProvider'

type StaffTypes = {
    data: any,
    object: doctor,
    callback: React.Dispatch<React.SetStateAction<doctor>>,
    active?: boolean
}

const Staff = (props: StaffTypes) => {
    var specialties = props.data.specialties.join(', ') || []
    const {image} = useImages(props.data._id)
    const {darkMode} = useContext(ThemeContext)

    function handleClick() {
        if(!props.active) props.callback(props.data)
    }

    return(
        <div title={specialties} className={"staff_type_container " + (darkMode ? 'dark_staff ' : ' ') + (props.active ? darkMode ? 'dark_active_staff': 'active_staff' : '')} onClick={handleClick}>
            <img src={image ? image : 'default_user.png'} alt='doctor of clinic'/>
            <div>{props.data.firstName + ' ' + props.data.lastName}</div>
        </div>
    )
}

export default Staff