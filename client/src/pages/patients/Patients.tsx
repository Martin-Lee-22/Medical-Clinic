import './Patients.css'
import '../Pages.css'
import AddButton from '../../components/SearchMenu/AddButton'
import SearchInput from '../../components/SearchMenu/SearchInput'
import SearchType from '../../components/SearchMenu/SearchType'
import {Patient} from './components/Patient'
import usePatients from '../../hooks/usePatients'
import { useContext, useEffect, useState } from 'react'
import {patientHeaders} from '../Headers'
import ModalContext from '../../context/modalProvider'
import Loading from '../../components/Loading/Loading'
import { Pages } from '../../data/Pages'
import { filterSearch } from '../../utils/SearchFunctions'
import useModal from '../../hooks/useModal'


const Patients = () => {
    const {patients, getPatients} = usePatients()
    const [search, setSearch] = useState<string>("")
    const searchTypes = patientHeaders
    const [selectedSearchType, setSelectedSearchType] = useState(searchTypes[0]['header'])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {setCallApi} = useContext(ModalContext)
    const {openModal, deleteModal} = useModal()

    useEffect(()=>{
        setCallApi(()=>async () => {
            await getPatients()
        })
    }, [])

    useEffect(()=>{
        if(patients) {setIsLoading(false)} else {setIsLoading(true)}
    }, [patients])

    return(
        <section className='section_container'>
            <div className='patients_container'>
                <div className='search_menu_container'>
                    <SearchInput selectedSearchType={selectedSearchType} setSearch={setSearch} searchTypes={searchTypes}/>
                    <SearchType searchTypes={searchTypes} setSelectedSearchType={setSelectedSearchType}/>
                    <AddButton pageType={Pages.Patient}/>
                </div>
                <div className='patient_list_container'>
                    <div className='patient_headings_container'>
                        {searchTypes.map((type, index)=>{
                            return <span key={index}>{type.header}</span>
                        })}
                    </div>
                    {isLoading ? <Loading/> : (patients.length === 0 ? <h1 className='no_patients'>No Patients Found</h1> : (patients && search ? patients.map((patient, index)=> {
                        if (search && filterSearch(patient, search, selectedSearchType, Pages.Patient)) {
                            return <Patient key={index} patient={patient} openModal={openModal} deleteModal={deleteModal}/>       
                        }}) : patients.map((patient, index)=> {
                        return(<Patient key={index} patient={patient} openModal={openModal} deleteModal={deleteModal}/>)
                    })))
                    }
                </div>
            </div>
        </section>
    )
}

export default Patients