import './Card.css'
import ClinicInfo from './Clinic/ClinicInfo'
import { Pages } from '../../data/Pages'
import EditDelete from '../EditDelete/EditDelete'
import useImages from '../../hooks/useImages'
import DoctorInfo from './Doctor/DoctorInfo'
import ThemeContext from '../../context/ThemeProvider'
import { useContext } from 'react'

const Card = (props:any) => {
    const {darkMode} = useContext(ThemeContext)
    const type = props.type || ''
    const heading = props.data?.name || 'Dr. ' + props.data?.firstName + ' ' + props.data?.lastName || 'Default'
    const data = props.data
    const {image} = useImages(props.data._id)

    return(
    <div className="card_container" id={darkMode ? 'dark_card_container':''}>
        <img src={image || 'default_user.png'} alt='card' className='card_img' onClick={()=>{props.openModal(props.type, props.data)}} />
        <h3>{heading}</h3>
        {props.type === Pages.Clinic && <ClinicInfo {...data}/>}
        {props.type === Pages.Doctor && <DoctorInfo {...data}/>}
        <div className='card_buttons_container'>
            <EditDelete type={type} data={data} openModal={props.openModal} deleteModal={props.deleteModal}/>
        </div>
    </div>)
}

export default Card