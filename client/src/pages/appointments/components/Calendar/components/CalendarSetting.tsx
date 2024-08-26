import { useContext, useRef, useState } from 'react';
import './CalendarSetting.css'
import ThemeContext from '../../../../../context/ThemeProvider';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

type CalendarSettingProps = {
    data: string[],
    begin: number,
    setBegin: React.Dispatch<React.SetStateAction<number>>,
    end: number,
    setEnd: React.Dispatch<React.SetStateAction<number>>,
}

const CalendarSetting = (props: CalendarSettingProps) => {
    const {darkMode} = useContext(ThemeContext)
    const [show, setShow] = useState(false)
    const calendarSetting = useRef(null)
    useOnClickOutside(calendarSetting, ()=>{setShow(false)}, show)

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.name === 'begin') {
            props.setBegin(Number(e.target.value));
        } else {
            props.setEnd(Number(e.target.value) + 1);
        }
    }

    return(
        <div className='calendar_setting_container' ref={calendarSetting}>
            <button className='calendar_setting_button' onClick={()=>setShow(!show)}>
                <img src='setting.png' alt='calendar setting'/>
            </button>
            {show && 
            <>
                <div className='calendar_setting_inner_container' id={darkMode ? 'calendar_setting_dark_mode' : ''}>
                    <select name='begin' defaultValue={props.begin} className='data_select' onChange={e => handleChange(e)}>
                        {props.data.map((data, index) => {
                            if(index < props.end) return <option value={index} key={index}>{data}</option>
                            return null
                        })}
                    </select>
                    <span>-</span>
                    <select name='end' defaultValue={props.end - 1} className='data_select' onChange={e => handleChange(e)}>
                        {props.data.map((data, index) => {
                            if(index >= props.begin) return <option value={index} key={index}>{data}</option>
                            return null
                        })}
                    </select>
                    <button className='calendar_setting_button_close' onClick={()=>{setShow(false)}}/>
                </div>
            </>
            }
        </div>
    )
}

export default CalendarSetting