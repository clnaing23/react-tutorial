export function checkConflict(selected, course){
    if (selected.meets != ""){
        if ((course.number != selected.number) && (course.term == selected.term)){
            console.log('in')
            const meets1 = selected.meets.split(" ");
            const meets2 = course.meets.split(" ");
            const [start1,fin1] = parseTime(meets1)
            
            const days1 = parseDays(meets1)
            const days2 = parseDays(meets2)
            const [start2,fin2] = parseTime(meets2)
            if (dayInvalid(days2,days1) && timeInvalid(start1,start2,fin1,fin2)){
                return true
            }
        }
    }
    return false
}

function parseTime(meets){
    const [start, finish] = meets[1].split("-");
    const [startHour, startMin] = start.split(":");
    const [finHour, finMin] = finish.split(":");
    return [parseInt(startHour)*60 + parseInt(startMin), parseInt(finHour)*60 + parseInt(finMin)]
}
function parseDays(meets){
    const days  = meets[0].split(/(?=[A-Z])/);
    return days
}

function timeInvalid(start1, start2, fin1, fin2){
    if ((start1 < start2) && (start2 < fin1)){
        return true
    }
    if (start1 < fin2){
        return true
    }
    return false
}

function dayInvalid(day1, day2){
    if(day1.some((day) => day2.includes(day))){
        return true;
    }
    return false;
}
