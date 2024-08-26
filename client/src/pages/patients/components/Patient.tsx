import './Patient.css'
import { Pages } from '../../../data/Pages'
import EditDelete from '../../../components/EditDelete/EditDelete'

type patientInfo = {
    address: string,
    city: string,
    conditions: [string],
    createdAt: string,
    creditCard: string,
    dob: string,
    email: string,
    firstName: string,
    lastName: string,
    medications: [string],
    phn: string,
    phoneNumber: string,
    postalCode: string,
    province: string,
    sex: string,
}

type patientType = {
    patient: patientInfo,
    openModal:(type:string, data:{})=>void, 
    deleteModal: (type:string, data:{})=>void
}


const formatDOB = (dob: string) => {
    const year = dob.substring(0,4)
    let month = dob.substring(5, 7)
    const day = dob.substring(8,10)
    const birthDate = new Date(month + '-' + day + '-' + year)
    month = birthDate.toLocaleString('default', { month: 'long' });
    return month + ' ' + day + ', ' + year
}

const formatName = (firstName: string, lastName: string) => {
    const limit = 16
    if((firstName + ' ' + lastName).length >= limit){
        return (firstName + ' ' + lastName).slice(0, limit) + '...'
    } else {
        return firstName + ' ' + lastName
    }
}

const Patient = (props: patientType) => {
    const fullName = formatName(props.patient.firstName, props.patient.lastName)
    const birthDate = formatDOB(props.patient.dob)
    const phoneNumber = props.patient.phoneNumber
    const phn = props.patient.phn

    return(
        <div className='patient_container'>
            <span>{fullName}</span>
            <span>{birthDate}</span>
            <span>{phn}</span>
            <span>{phoneNumber}</span>
            <EditDelete type={Pages.Patient} data={props.patient} openModal={props.openModal} deleteModal={props.deleteModal}/>
        </div>
    )
}

export {Patient}
export type {patientInfo}
