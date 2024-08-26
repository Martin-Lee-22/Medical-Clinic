import {startOfWeek, addDays, getWeeksInMonth, eachDayOfInterval, startOfMonth, add} from "date-fns";

function getDaysinMonthInWeeklyIntervals (date: Date): Date[][] {
    let numberOfWeeks = getWeeksInMonth(date)
    let totalCalendarDays = numberOfWeeks * 7
    let firstCalendarDay = startOfWeek(startOfMonth(date))
    let lastCalendarDay = addDays(firstCalendarDay, totalCalendarDays - 1)
    let days = eachDayOfInterval({
        start: firstCalendarDay,
        end: lastCalendarDay
    })

    let weeks = []
    var week: Date[] = []
    for (let i = 0; i < days.length; i++) {
        week.push(days[i])
        if(week.length === 7){
            weeks.push(week)
            week = []
        }
    }
    return weeks
}

function createWeekHeader(date: Date, weeks:Date[][], setWeekStart: React.Dispatch<React.SetStateAction<string>>, setWeekEnd: React.Dispatch<React.SetStateAction<string>>): void{
    for(let i = 0; i < weeks.length; i++) {
        if (weeks[i].find((d) => d.toDateString() === date.toDateString())){
            setWeekStart(weeks[i][0].toDateString().slice(0,10))
            setWeekEnd(weeks[i][6].toDateString().slice(0,10))
            break;
        }
    }
}

function findWeekIndex (date: Date){
    let weeks = getDaysinMonthInWeeklyIntervals(date)
    for(let i = 0; i < weeks.length; i++) {
        if (weeks[i].find((d) => d.toDateString() === date.toDateString())){
            return i
        }
    }
}

// function sameWeek (date:Date, weekIndex:number){
//     if()
// }

function changeMonth (date: Date, callback:React.Dispatch<React.SetStateAction<Date>>, change: number) {
    var newDate = date
   if(change > 0){
    newDate = add(date, {months: change})
   } else {
    newDate = add(date, {months: change})
   }
   callback(newDate)
}

function changeDays (next:boolean, date:Date, callback:React.Dispatch<React.SetStateAction<Date>>) {
    if (next) {
        callback(add(date,{weeks:1}))
    } else {
        callback(add(date,{weeks:-1}))
    }
}

export {getDaysinMonthInWeeklyIntervals, createWeekHeader, findWeekIndex, changeMonth, changeDays}