import './PatientInput.css'
import { filterSearch } from '../../../../utils/SearchFunctions'
import { Pages } from '../../../../data/Pages'
import { patient } from '../../../../data/Types'
import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../../../context/ThemeProvider'

const PatientInput = (props:any) => {
    const [search, setSearch] = useState('')
    const [index, setIndex] = useState(0)
    const [show, setShow]= useState(false)
    const [list, setList] = useState<patient[]>([])
    const {darkMode} = useContext(ThemeContext)

    useEffect(()=>{
        if(props.patients !== undefined) {
            setList(props.patients)
            if(props.patientID){
                let patient = props.patients.find((patient:patient)=>{return props.patientID === patient._id})
                setIndex(props.patients.indexOf(patient))
                setSearch(patient.firstName + ' ' + patient.lastName)
            }
        }
    }, [props.patients])

    useEffect(()=>{
        if(search){
            let newList = props.patients.filter((p:patient)=>{
                if(filterSearch(p, search, 'Name', Pages.Patient)) return true
            })
            setList(newList)
        } else {
            setList(props.patients)
        }
    },[search])

    useEffect(()=>{
        if(list.length !== 0) props.setPatientName(list[index].firstName + ' ' + list[index].lastName)
    },[index])

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            if (index < list.length - 1 && index >= 0) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }
        if (e.key === "ArrowUp") {
            if (index <= 0 ) {
                setIndex(list.length - 1);
            } else {
                setIndex(index - 1)
            }
        }

        if(e.key === "Enter"){
            if(list.length !== 0){
                setSearch(list[index].firstName + ' ' + list[index].lastName)
                props.setPatientID(list[index]._id)
                props.setPatientName(list[index].firstName + ' ' + list[index].lastName)
                setList([])
                setShow(false)
            }
        } 
    }

    const handleOnChange = (e:any) =>{
        setSearch(e.target.value)
        if(!show) setShow(true)
    }

    const handleClick = (name:string, i:number) =>{
        console.log(i)
        setSearch(name)
        props.setPatientID(list[i]._id)
        props.setPatientName(list[i].firstName + ' ' + list[i].lastName)
        setIndex(i)
        if(show) setShow(false)
    }

    const handleBlur = () =>{
        setTimeout(()=>{setShow(false)}, 125)
    }


    return(
        <div className='patient_input_container'>
            <span>Patient:</span>
            <br/>
            <img src='search_grey.png' alt='search patient'/>
            <input type='search' required={true} placeholder='Search Patients...' value={search || ''} onClick={()=>{setShow(true)}} onBlur={handleBlur}  onChange={(e)=>{handleOnChange(e)}} onKeyDown={handleKeyDown}/>
            <ul className={darkMode ? 'patient_input_dark_mode': ''}>
                {show && list.map((patient:patient, i:number)=>{
                    let fullName = patient.firstName + ' ' + patient.lastName
                    return <li key={i} id={i === index ? darkMode ? 'active_dark_mode' : 'active' : ''} onClick={()=>handleClick(fullName, i)} >{fullName}</li>
                })}
            </ul>
        </div>
    )
}

export default PatientInput