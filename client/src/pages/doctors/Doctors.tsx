import './Doctors.css'
import '../Pages.css'
import AddButton from '../../components/SearchMenu/AddButton'
import {Pages} from '../../data/Pages'
import { useContext, useEffect, useState } from 'react'
import SortType from '../../components/SearchMenu/SortType'
import SearchType from '../../components/SearchMenu/SearchType'
import { doctorHeaders } from '../Headers'
import SearchInput from '../../components/SearchMenu/SearchInput'
import useDoctors from '../../hooks/useDoctors'
import Card from '../../components/Card/Card'
import ModalContext from '../../context/modalProvider'
import useModal from '../../hooks/useModal'
import Loading from '../../components/Loading/Loading'
import { filterSearch } from '../../utils/SearchFunctions'

const Doctors = () => {
    const {doctors, getDoctors} = useDoctors()
    const [search, setSearch] = useState<string>("")
    const [selectedSearchType, setSelectedSearchType] = useState(doctorHeaders[0]['header'])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {openModal, deleteModal} = useModal()

    const {setCallApi} = useContext(ModalContext)

    useEffect(()=>{
        if(doctors) {setIsLoading(false)} else {setIsLoading(true)}
    }, [doctors])

    useEffect(()=>{
        setCallApi(()=>async()=>{
            await getDoctors()
        }) 
    },[])


    return(<section className="section_container">
        <div className='doctors_container'>
            <div className='search_menu_container'>
                <SearchInput selectedSearchType={selectedSearchType} setSearch={setSearch} searchTypes={doctorHeaders}/>
                <SearchType searchTypes={doctorHeaders} setSelectedSearchType={setSelectedSearchType}/>
                <AddButton pageType={Pages.Doctor}/>
            </div>
            <div className='doctors_list_container'>
            {isLoading ? <Loading/> : (doctors.length === 0 ? <h1 className='no_doctors'>No Doctors Found</h1>:(doctors && search ? doctors.map((doctor)=> { 
                        if (search && filterSearch(doctor, search, selectedSearchType, Pages.Doctor)) {
                            return <div key={doctor._id}><Card data={doctor} type={Pages.Doctor} openModal={openModal} deleteModal={deleteModal}/></div>
                        }}) : doctors.map((doctor)=> {
                        return <div key={doctor._id}><Card data={doctor} type={Pages.Doctor} openModal={openModal} deleteModal={deleteModal}/></div>
                    })))
                }
            </div>
        </div>
    </section>)
}

export default Doctors