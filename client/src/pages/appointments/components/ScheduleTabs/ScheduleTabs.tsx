import ChangeDaysButton from "./ChangeDaysButton"
import DateSelector from "./DateSelector"
import './ScheduleTabs.css'

type scheduleTabs = { 
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
    weekIndex:number,
    setWeekIndex:React.Dispatch<React.SetStateAction<number>>,
    weeks:Date[][]
}

const ScheduleTabs = (props: scheduleTabs) => {
    return(
        <div className="schedule_tabs_container">
            <ChangeDaysButton next={false} date={props.date} setDate={props.setDate}/>
            <DateSelector date={props.date} setDate={props.setDate} weekIndex={props.weekIndex} setWeekIndex={props.setWeekIndex} weeks={props.weeks}/>
            <ChangeDaysButton next={true} date={props.date} setDate={props.setDate}/>
        </div>
    )
}

export default ScheduleTabs