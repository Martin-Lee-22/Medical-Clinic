import {useState, useMemo, useContext, useEffect} from 'react'
import { clinics, doctor } from '../../../../data/Types'
import './StaffContainer.css'
import Staff from './components/Staff'
import { filterSearch } from '../../../../utils/SearchFunctions'
import { Pages } from '../../../../data/Pages'
import StaffInput from './components/StaffInput'
import SpecialtiesSelect from './components/SpecialtiesSelect'
import ClinicSelector from './components/ClinicSelector'
import ThemeContext from '../../../../context/ThemeProvider'

type DoctorsContainerType = {
    clinic: clinics,
    doctors: doctor[],
    doctor: doctor,
    setDoctor: React.Dispatch<React.SetStateAction<doctor>>,
    clinics : clinics[],
    setClinic:  React.Dispatch<React.SetStateAction<clinics>>
}

function filterDoctors(doctors: doctor[], clinicID: string) {
    let newDoctors:doctor[] = doctors.filter((doctor:any)=>{
        if(doctor.clinics.find((clinicId:any)=>{return clinicId === clinicID})) return doctor             
    })
    return newDoctors
}

const StaffContainer = (props:DoctorsContainerType) => {
    const [clinicDoctors, setClinicDoctors] = useState<doctor[]>([])

    useEffect(()=>{
        if(props.clinic._id !== ''){
            setClinicDoctors(filterDoctors(props.doctors, props.clinic._id))
        }
    }, [props.clinic, props.doctors, props.doctor])

    const [search, setSearch] = useState('')
    const [specialties, setSpecialties] = useState<string[]>([])

    const {darkMode} = useContext(ThemeContext)

    return(
        <div className={'staff_container ' + (clinicDoctors ? '' : 'empty_list')} id={darkMode ? 'dark_staff_container':''}>
            <div className='staff_input_staff_container'>
                <div className='input_container' id={darkMode ? 'dark_input_container':''}>
                    <ClinicSelector clinics={props.clinics} clinic={props.clinic} setClinic={props.setClinic}/>
                    <StaffInput setSearch={setSearch}/>
                    <SpecialtiesSelect specialties={specialties} setSpecialties={setSpecialties}/>
                </div>
                <div className='staff_list'>
                    {clinicDoctors.map((doctor)=>{
                        if(doctor.specialties.some(s => specialties.includes(s))){
                            if(filterSearch(doctor, search, 'Name', Pages.Doctor)) return <Staff key={doctor._id} data={doctor} object={props.doctor} callback={props.setDoctor} active={doctor._id === props.doctor._id ? true : false}/>
                        } else {
                            if(!specialties.length && filterSearch(doctor, search, 'Name', Pages.Doctor)) return <Staff key={doctor._id} data={doctor} object={props.doctor} callback={props.setDoctor} active={doctor._id === props.doctor._id ? true : false}/>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default StaffContainer