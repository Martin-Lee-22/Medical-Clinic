import { useEffect, useState, useRef, useContext } from "react";
import './DateSelector.css'
import { days } from "../../../../data/HoursOfOperation";
import { createWeekHeader, changeMonth} from "../../../../utils/CalendarFunctions";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import ThemeContext from "../../../../context/ThemeProvider";

type DateSelector = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    weekIndex:number,
    setWeekIndex:React.Dispatch<React.SetStateAction<number>>,
    weeks:Date[][]
}

const DateSelector = (props:DateSelector) => {
    const [weekStart, setWeekStart] = useState('')
    const [weekEnd, setWeekEnd] = useState('')
    const [showCalendar, setshowCalendar] = useState(false)
    const calendar = useRef(null)
    useOnClickOutside(calendar, ()=>{setshowCalendar(false)}, showCalendar)

    const {darkMode} = useContext(ThemeContext)

    useEffect(() => {
        createWeekHeader(props.date, props.weeks, setWeekStart, setWeekEnd)
    }, [props.weeks])

    return(
        <div className="date_selector_container">
            <h3>{weekStart} - {weekEnd}</h3>
            <div className="date_selector_calendar_container" ref={calendar}>
                <img src="calendar.png" alt="calendar" onClick={() => {setshowCalendar(!showCalendar)}} className={'date_selector_calendar ' + (showCalendar ? 'calendar_selected' : '')}/>
                {showCalendar && 
                <div className="date_selector_pop_up_calendar" id={darkMode ? 'dark_date_selector_pop_up_calendar':''}>
                    <h3 >{props.date.toLocaleString('default', { month: 'long' })} {props.date.getFullYear()}</h3>
                    <img src="arrow.png" alt="left arrow" onClick={()=>{changeMonth(props.date, props.setDate, -1)}}/>
                    <img src="arrow.png" alt="right arrow" onClick={()=>{changeMonth(props.date, props.setDate, 1)}}/>
                    <table>
                        <thead>
                            <tr>
                                {days.map((day) => {
                                    return <th key={day}>{day.charAt(0)}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {props.weeks.map((week, i) => {
                                return <tr key={i} onClick={() => props.setWeekIndex(i)} className={props.weekIndex === i ? 'selected_week' : 'hover_week' }>{week.map((date) => {
                                    return <td key={date.getDate()} onClick={() => props.setDate(date)}>{date.getDate()}</td>
                                })}</tr>
                            })}
                        </tbody>
                    </table>
                    <br/>
                </div>
                }
            </div>
        </div>
    )
}

export default DateSelector