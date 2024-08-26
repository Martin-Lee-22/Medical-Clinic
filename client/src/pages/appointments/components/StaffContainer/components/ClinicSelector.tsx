import { clinics } from "../../../../../data/Types"
import './ClinicSelector.css'

type clinicSelectorProps = {
    clinic: clinics | undefined,
    clinics : clinics[],
    setClinic:  React.Dispatch<React.SetStateAction<clinics>>
}
const ClinicSelector = (props: clinicSelectorProps) => {
    return(
        <div className='clinic_selector_container'>
            <label htmlFor="clinic">Select Clinic: </label>
            <select name="clinic" id="clinic" onChange={(e)=>{props.setClinic(props.clinics[e.target.selectedIndex - 1])}}>
                {!props.clinic?._id ? <option defaultChecked value='' hidden/> : <option defaultChecked hidden>{props.clinic.name}</option>}
                {props.clinics.map((clinic:clinics, index:number) => {
                    return <option value={index} key={index}>{clinic.name}</option>
                })}
            </select>
        </div>
    )
}

export default ClinicSelector