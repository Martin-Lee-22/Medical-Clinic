import './DoctorInfo.css'
import { formatNumber } from '../../../utils/helperFunctions'

type propsType = {
    address: string,
    city:string,
    province: string,
    postalCode:string,
    phoneNumber:string,
    email: string,
    specialties: string[]
}

const DoctorInfo = (props: propsType) => {
    const address = props.address || ''
    const city = props.city || ''
    const province = props.province || ''
    const postalCode = props.postalCode || ''
    const phoneNumber = formatNumber(props.phoneNumber) || ''
    const email = props.email || ''
    const specialties = props.specialties || []

    return(
        <div className="doctor_info_container">
            <span>
                {address + ', ' + city + ', ' + province + ' ' + postalCode}
            </span>
            <br />
            <span className='doctor_heading'>Phone: </span><span>{phoneNumber}</span>
            <br/>
            <span className='doctor_heading'>Email: </span><span>{email}</span>
            <br/>
            <span className='doctor_heading'>Specialties: </span>
            {specialties.map((specialty, index)=>{
                return <span className='specialty' key={index}>{index !== specialties.length - 1 ? `${specialty}, ` : specialty}</span>
            })}
        </div>
    )
}

export default DoctorInfo