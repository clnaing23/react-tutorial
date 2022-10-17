export function checkConflict(courses, selected){
    let invalid = []
    const meetsSelected = selected.meets.split(" ");
    const daysSelected = meetsSelected[0].split(' ')
    const [startSel,finSel] = parseTime(meetsSelected)
    if (selected.meets != ""){
        Object.entries(courses).forEach(([item, course]) => {
            if ((course.number != selected.number) && (course.term == selected.term)){
                const meetsCour = course.meets.split(" ");
                const daysCour = meetsCour[0].split(' ')
                const [startCour,finCour] = parseTime(meetsCour)
                if ((daysSelected[0] == daysCour[0]) && timeInvalid(startSel,startCour,finSel,finCour)){
                    invalid.push(item)
                }
            }
        })
    }
    
    return invalid
}

function parseTime(meets){
    const [start, finish] = meets[1].split("-");
    const [startHour, startMin] = start.split(":");
    const [finHour, finMin] = finish.split(":");
    return [parseInt(startHour)*60 + parseInt(startMin), parseInt(finHour)*60 + parseInt(finMin)]
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

