import { useState } from "react"
import { hours, meridiem } from "../../../data/HoursOfOperation"
import './OperationHours.css'

type propsType = {
 hoursOfOperation:any,
 setHoursOfOperation:React.Dispatch<any>,
 day: string
}

const OperationHours = (props:propsType) => {

    const [closed, setClosed] = useState(props.hoursOfOperation[props.day]['closed'] || false)

    const start = props.hoursOfOperation[props.day]['start']
    const end = props.hoursOfOperation[props.day]['end']
    const start_meridiem = props.hoursOfOperation[props.day]['start_meridiem']
    const end_meridiem = props.hoursOfOperation[props.day]['end_meridiem']

    const handleChange = (e:any) => {
        const {name, value, className, checked}= e.target
        let updatedValue =  props.hoursOfOperation
        if(className !== 'closed'){
            updatedValue[name][className] = value
        } else {
            updatedValue[name][className] = checked
            setClosed(!closed)
        }
        props.setHoursOfOperation(updatedValue)
    }

    return(<tr className="operation_hours_container">
        <td>
            <label>{props.day}:</label>
        </td>
        <td>
            <select name={props.day} className='start' disabled={closed} defaultValue={start !== '' ? start : ''} onChange={e => handleChange(e)}>
            <option defaultValue={''} disabled/>
            {hours.map((hour:string, index:number) => {
                return <option key={index} value={hour}>{hour}</option>
            })}
            </select>
            <select name={props.day} className='start_meridiem' defaultValue={start_meridiem !== '' ? start_meridiem : ''} disabled={closed} onChange={e => handleChange(e)}>
                <option defaultValue={''} disabled/>
                {meridiem.map((meridiem, index)=>{
                    return <option key={index} value={meridiem}>{meridiem}</option>
                })}
            </select>
            <span>-</span>
            <select name={props.day} className='end' defaultValue={end !== '' ? end : ''} disabled={closed} onChange={e => handleChange(e)}>
                <option defaultValue={''} disabled/>
                {hours.map((hour:string, index:number) => {
                    return <option key={index} value={hour}>{hour}</option>
                })}
            </select>
            <select name={props.day} className='end_meridiem' defaultValue={end_meridiem !== '' ? end_meridiem : ''} disabled={closed} onChange={e => handleChange(e)}>
                <option defaultValue={''} disabled/>
                {meridiem.map((meridiem, index)=>{
                    return <option key={index} value={meridiem}>{meridiem}</option>
                })}
            </select>
        </td>
        <td>
            <label className="closed_label">Closed</label>
            <input name={props.day} type="checkbox" className="closed" checked={closed} onChange={e => handleChange(e)}/>
        </td>   
    </tr>)
}

export default OperationHours