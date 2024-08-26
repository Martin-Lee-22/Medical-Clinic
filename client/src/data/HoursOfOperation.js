const hours = [
    '12:00', 
    '12:30',
    '1:00', 
    '1:30', 
    '2:00', 
    '2:30', 
    '3:00', 
    '3:30', 
    '4:00', 
    '4:30', 
    '5:00', 
    '5:30', 
    '6:00', 
    '6:30', 
    '7:00', 
    '7:30', 
    '8:00', 
    '8:30', 
    '9:00',
    '9:30', 
    '10:00', 
    '10:30', 
    '11:00', 
    '11:30' 
]

// const calendarHours = [
//     '1:00 AM', 
//     '2:00 AM', 
//     '3:00 AM', 
//     '4:00 AM', 
//     '5:00 AM', 
//     '6:00 AM', 
//     '7:00 AM', 
//     '8:00 AM', 
//     '9:00 AM',
//     '10:00 AM', 
//     '11:00 AM', 
//     '12:00 PM', 
//     '1:00 PM', 
//     '2:00 PM', 
//     '3:00 PM', 
//     '4:00 PM', 
//     '5:00 PM', 
//     '6:00 PM', 
//     '7:00 PM', 
//     '8:00 PM', 
//     '9:00 PM',
//     '10:00 PM', 
//     '11:00 PM',
//     '12:00 PM',
// ]


function createCalendarHours() {
    const hours = []
    var meridiem = 'PM'
    for (let i = 12; i < 13; i++){
        if(i === 12) {
            if(meridiem === 'AM'){
                meridiem = 'PM'
            } else {
                meridiem = 'AM'
            }
        }
        let fullHour = {
            hour: i,
            minute: 0,
            meridiem: meridiem
        }
        hours.push(fullHour)
        
        let halfHour = {
            hour: i,
            minute: 30,
            meridiem: meridiem
        }
        hours.push(halfHour)

        if(hours.length === 48) break;
        if(i === 12){
            i = 0
        }
    }
    return hours
}

const calendarHours = createCalendarHours()

const meridiem = [
    'AM',
    'PM'
]

const days = [
    'Sunday',
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday'
]

const default_schedule = {
    Sunday: {
        start: '',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Monday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Tuesday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Wednesday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Thursday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Friday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    },
    Saturday: {
        start:'',
        end:'',
        start_meridiem:'',
        end_meridiem:'',
        closed:false
    }
}

export {hours, meridiem, days, default_schedule, calendarHours}