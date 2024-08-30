import { useContext, useEffect, useState } from 'react'
import AddButton from '../../components/SearchMenu/AddButton'
import SearchInput from '../../components/SearchMenu/SearchInput'
import SearchType from '../../components/SearchMenu/SearchType'
import useClinics from '../../hooks/useClinics'
import { clinicHeaders } from '../Headers'
import { Pages } from '../../data/Pages'
import './Clinics.css'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import { filterSearch } from '../../utils/SearchFunctions'
import ModalContext from '../../context/modalProvider'
import useModal from '../../hooks/useModal'
import { clinics } from '../../data/Types'

const Clinics = () => {
    const {clinics, getClinics} = useClinics()
    const [search, setSearch] = useState<string>("")
    const [selectedSearchType, setSelectedSearchType] = useState(clinicHeaders[0]['header'])
    const {setCallApi} = useContext(ModalContext)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {openModal, deleteModal} = useModal()
    

    useEffect(()=>{
        setCallApi(()=>async () => {
            await getClinics()
        })
    }, [])

    useEffect(()=>{
        if(clinics) {setIsLoading(false)} else {setIsLoading(true)}
    }, [clinics])

    return(
        <section className='section_container'>
            <div className='clinics_container'>
                <div className='search_menu_container'>
                    <SearchInput selectedSearchType={selectedSearchType} setSearch={setSearch} searchTypes={clinicHeaders}/>
                    <SearchType searchTypes={clinicHeaders} setSelectedSearchType={setSelectedSearchType}/>
                    <AddButton pageType={Pages.Clinic}/>
                </div>
                <div className='clinics_list_container'>
                    {isLoading ? <Loading/> : (clinics.length === 0 ? <h1 className='no_clinics'>No Clinics Found</h1>:(search ? clinics.map((clinic:clinics)=> {
                        if (search && filterSearch(clinic, search, selectedSearchType, Pages.Clinic)) {
                            return <div key={clinic._id}><Card data={clinic} type={Pages.Clinic} openModal={openModal} deleteModal={deleteModal}/></div>
                        }}) : clinics.map((clinic:clinics)=> {
                        return <div key={clinic._id}><Card data={clinic} type={Pages.Clinic} openModal={openModal} deleteModal={deleteModal}/></div>
                        })))
                    }
                </div>
            </div>
        </section>
    )
}

export default Clinics