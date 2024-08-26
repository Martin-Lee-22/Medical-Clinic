import './ChangeDaysButton.css'
import { add } from 'date-fns'
import { changeDays } from '../../../../utils/CalendarFunctions'

type ChangeDaysProps = {
    next: boolean;
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

const ChangeDaysButton = (props:ChangeDaysProps) => {
    return(
        <button className={'change_days_button ' + (props.next ? 'right_button' : 'left_button')} onClick={()=>{changeDays(props.next, props.date, props.setDate)}}>
            {!props.next && <img src="arrow.png" className='left_arrow' alt='left arrow'/>}
            <span>{props.next ? 'Next' : 'Prev'} 7 Days</span>
            {props.next && <img src="arrow.png" className='right_arrow' alt='right arrow'/>}
        </button>
    )
}

export default ChangeDaysButton