import { formatNumber } from '../../../utils/helperFunctions'
import './ClinicInfo.css'

type operationHours = {
    start:string,
    end: string,
    close: boolean
}

type propsTypes = {
    address: string,
    city: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    fax: string,
    email: string,
    hours: {
        monday:operationHours,
        tuesday:operationHours, 
        wednesday:operationHours, 
        thursday:operationHours, 
        friday:operationHours, 
        saturday:operationHours, 
        sunday:operationHours
    }
}

const ClinicInfo = (props: propsTypes) => {
    const address = props.address || ''
    const city = props.city || ''
    const province = props.province || ''
    const postalCode = props.postalCode || ''
    const phoneNumber = formatNumber(props.phoneNumber) || ''
    const fax = formatNumber(props.fax) || ''
    const email = props.email || ''

    return(
        <div className='clinic_info_container'>
            <span>
                {address + ', ' + city + ', ' + province + ' ' + postalCode}
            </span>
            <br />
            <span>Phone: </span>{phoneNumber}
            <br/>
            <span>Fax: </span>{fax}
            <br/>
            <span>Email: </span>{email}
        </div>
    )
}

export default ClinicInfo