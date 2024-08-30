import './Calendar.css'
import {calendarHours } from '../../../../data/HoursOfOperation'
import ScheduleTabs from '../ScheduleTabs/ScheduleTabs'
import { useEffect, useState, useContext } from 'react'
import {getDaysinMonthInWeeklyIntervals, findWeekIndex} from "../../../../utils/CalendarFunctions";
import {format, isSameDay, add, addDays} from 'date-fns';
import CalendarSetting from './components/CalendarSetting';
import { days } from '../../../../data/HoursOfOperation';
import useAppointments from '../../../../hooks/useAppointments';
import {clinics, doctor, time } from '../../../../data/Types';
import Appointment from './components/Appointment';
import { patient } from '../../../../data/Types';
import useModal from '../../../../hooks/useModal';
import { Pages } from '../../../../data/Pages';
import { convertTime12to24 } from '../../../../utils/helperFunctions';
import CalendarInstructions from './components/CalendarInstructions';
import ModalContext from '../../../../context/modalProvider';
import ThemeContext from '../../../../context/ThemeProvider';
import { createCookie, getCookie } from '../../../../utils/Cookies';

type calendarPropTypes = {
    clinic:clinics | undefined,
    doctor: doctor | undefined,
    patients: patient[] | undefined
}


const Calendar = (props:calendarPropTypes) => {
    const [date, setDate] = useState(new Date())
    const [weeks, setWeeks] = useState(getDaysinMonthInWeeklyIntervals(date))
    const [weekIndex, setWeekIndex] = useState(findWeekIndex(date) || 0)

    const [weekBegin, setWeekBegin] = useState(0)
    const [weekEnd, setWeekEnd] = useState(weeks[weekIndex].length)
    const [week, setWeek] = useState(weeks[weekIndex].slice(weekBegin, weekEnd))

    const [timeBegin, setTimeBegin] = useState(0)
    const [timeEnd, setTimeEnd] = useState(calendarHours.length)
    const [hours, setHours] = useState(calendarHours.slice(timeBegin, timeEnd))

    const {appointments, getAppointmentsDateClinicDoctorID} = useAppointments()

    const {setCallApi} = useContext(ModalContext)
    const {openModal} = useModal()

    const {darkMode} = useContext(ThemeContext)

    useEffect(()=>{
        if(getCookie('date')) setDate(new Date(getCookie('date')))
        if(getCookie('weekBegin')) setWeekBegin(Number(getCookie('weekBegin')))
        if(getCookie('weekEnd')) setWeekEnd(Number(getCookie('weekEnd')))
        if(getCookie('timeBegin')) setTimeBegin(Number(getCookie('timeBegin')))
        if(getCookie('timeEnd')) setTimeEnd(Number(getCookie('timeEnd')))
    }, [])

    useEffect(()=>{
        setWeeks(getDaysinMonthInWeeklyIntervals(date))
        setWeekIndex(findWeekIndex(date) || 0)
        createCookie('date', date.toString(), addDays(new Date(), 2))
    },[date])

    useEffect(()=>{
        createCookie('timeBegin', timeBegin.toString(), addDays(new Date(), 2))
        createCookie('timeEnd', timeEnd.toString(), addDays(new Date(), 2))
        setHours(calendarHours.slice(timeBegin, timeEnd))
    },[timeBegin, timeEnd])

    useEffect(()=>{
        setWeek(weeks[weekIndex].slice(weekBegin, weekEnd))
    },[weekIndex])

    useEffect(()=>{
        createCookie('weekBegin', weekBegin.toString(), addDays(new Date(), 2))
        createCookie('weekEnd', weekEnd.toString(), addDays(new Date(), 2))
        setWeek(weeks[weekIndex].slice(weekBegin, weekEnd))
    },[weekBegin, weekEnd])

    useEffect(()=>{
            const callAppointment = async ()=>{
                if(props.doctor && props.clinic && week){
                await getAppointmentsDateClinicDoctorID(props.clinic._id, props.doctor._id, week[0], week[week.length - 1])
                } 
            }
            callAppointment()
            setCallApi(()=>async () => {
                if(props.doctor?._id && props.clinic?._id && week){
                    await getAppointmentsDateClinicDoctorID(props.clinic._id, props.doctor._id, week[0], week[week.length - 1]) 
                }
            })
    },[props.doctor, props.clinic, week])


    const insertAvailableTimes = (appointment:any) =>{
        let time = hours.map((hour)=>{return hour.hour.toString()+ ":" + (hour.minute === 0 ? "00" : "30") + ' ' + hour.meridiem})
        var appointmentDate = new Date(appointment.startDate)

        let firstAppointment = appointments.find((a)=>{
            let aDate = new Date(a.startDate)
            if(isSameDay(a.startDate, appointment.startDate) && aDate > appointmentDate) return true
        })

        let startIndex = time.indexOf(format(appointment.startDate,'p')) + 1
        var endIndex = time.length
        if(firstAppointment !== undefined){   
            endIndex = time.indexOf(format(firstAppointment.startDate,'p')) + 1
        }
        let availableTimes = hours.slice(startIndex, endIndex)
        appointment.availableTimes = availableTimes
    }

    const createEmptyAppointment = (date:Date, hour:number, minutes:number, meridiem:string, endTime: time) => {
        let newStartDate = add(date,{hours: convertTime12to24(hour, meridiem), minutes: minutes})
        let newEndDate = null
        if(endTime !== undefined){
            newEndDate = add(date,{hours: convertTime12to24(endTime.hour, endTime.meridiem), minutes: endTime.minute})
        } else {
            let newTime = null
            if(calendarHours[timeEnd + 1] !== undefined){
                newTime = calendarHours[timeEnd + 1]
            } else {
                newTime = calendarHours[0]
            }
            newEndDate = add(date,{hours: convertTime12to24(newTime.hour, newTime.meridiem), minutes: newTime.minute})
        }
        let doctorID = ''
        let clinicID = ''
        if(props.doctor !== undefined) doctorID = props.doctor._id
        if(props.clinic !== undefined) clinicID = props.clinic._id
        var newAppointment = {
            startDate: newStartDate,
            endDate: newEndDate,
            doctorID: doctorID,
            patientID: '',
            clinicID: clinicID,
            description: '',
            complete: false,
            paid: false,
            price: 0,
            doctorName: props.doctor?.firstName + ' ' + props.doctor?.lastName
        }
        insertAvailableTimes(newAppointment)
        return newAppointment
    }

    return(
        <div className='appointments_container' id={darkMode ? 'dark_appointments_container' : ''}>
            {(!props.clinic?._id || !props.doctor?._id) && <CalendarInstructions/>}
            <ScheduleTabs date={date} setDate={setDate} weekIndex={weekIndex} setWeekIndex={setWeekIndex} weeks={weeks}/>
            <table className='calendar_table'>
                <thead>
                    <tr>
                        <th className='calendar_setting_th'>
                            <CalendarSetting data={days} begin={weekBegin} setBegin={setWeekBegin} end={weekEnd} setEnd={setWeekEnd}/>
                            <CalendarSetting data={calendarHours.map((t)=>{return t.hour.toString()+ ":" + (t.minute === 0 ? "00" : "30") + t.meridiem})} 
                                begin={timeBegin} setBegin={setTimeBegin} end={timeEnd} setEnd={setTimeEnd}/>
                        </th>
                        {week.map((day, index) =>{
                            return (<th key={index}>
                                        <div>{format(day, 'EEEE')}</div>
                                        <div>{format(day, 'PP')}</div>
                                    </th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((time, index) =>{
                        var currentTime = `${time.hour.toString()}:${time.minute === 0 ? '00' : '30'} ${time.meridiem}`
                        var currentAppointments = appointments?.filter((appointment)=>{
                            return format(appointment.startDate, 'p') === currentTime})
                        return <tr key={index}>
                                <th className={index % 2 !== 0 ? 'half_hour_row' : ''}>{currentTime}</th>
                                {week.map((day, i)=>{
                                    if(currentAppointments?.length === 0) return <td key={i} className='add_appointment_td' onClick={()=>{openModal(Pages.Appointment, createEmptyAppointment(day, time.hour, time.minute, time.meridiem, hours[index + 1]))}}><span>&#43;</span></td>
                                    let currentAppointment = currentAppointments?.find((currentAppointment)=>{ return isSameDay(currentAppointment.startDate, day)})
                                    if(currentAppointment === undefined) return <td key={i} className='add_appointment_td' onClick={()=>{openModal(Pages.Appointment, createEmptyAppointment(day, time.hour, time.minute, time.meridiem, hours[index + 1]))}}><span>&#43;</span></td>
                                    currentAppointments = currentAppointments?.filter((appointment)=>{return appointment !== currentAppointment})
                                    currentAppointment.doctorName = props.doctor?.firstName + ' ' + props.doctor?.lastName
                                    insertAvailableTimes(currentAppointment)
                                    return <td key={i}><Appointment appointment={currentAppointment} color={props.doctor ? props.doctor.color : '#f08080'} openModal={openModal}/></td>
                                })}
                            </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar