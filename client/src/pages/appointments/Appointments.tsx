import {useEffect, useState } from 'react'
import './Appointments.css'
import useClinics from '../../hooks/useClinics'
import StaffContainer from './components/StaffContainer/StaffContainer';
import useDoctors from '../../hooks/useDoctors';
import { clinics, doctor } from '../../data/Types';
import Calendar from './components/Calendar/Calendar';
import useModal from '../../hooks/useModal';
import { Pages } from '../../data/Pages';
import usePatients from '../../hooks/usePatients';
import { addDays } from 'date-fns';
import { createCookie, getCookie } from '../../utils/Cookies';
import ModalContext from '../../context/modalProvider';

const Appointments = () => {
    const {clinics, getClinic, clinic, setClinic} = useClinics()
    const {doctors, doctor, setDoctor, getDoctor} = useDoctors()
    const {patients, getPatientsViaClinicID} = usePatients()

    useEffect(()=>{
        if(doctor._id !== ''){
            createCookie('doctor', doctor._id, addDays(new Date(), 2))
        } else {
            if(getCookie('doctor')) getDoctor(getCookie('doctor'))
        }
    }, [doctor])

    useEffect(()=>{
        if (clinic._id !== '') {
        getPatientsViaClinicID(clinic._id)
        createCookie('clinic', clinic._id, addDays(new Date(), 2))
        } else {
            if(getCookie('clinic')) getClinic(getCookie('clinic'))
        }
    }, [clinic])

    return(
        <section className='section_container appointment_section'>
            <StaffContainer clinic={clinic} doctors={doctors} doctor={doctor} setDoctor={setDoctor} clinics={clinics} setClinic={setClinic}/>
            <Calendar clinic={clinic} doctor={doctor} patients={patients}/>
        </section>
    )
}

export default Appointments