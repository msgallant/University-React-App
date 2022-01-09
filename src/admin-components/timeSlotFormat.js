//times must be in certain form (eg. 10:00am, 1:00pm)
export const checkIfValidTime = (myTime) => {

    const myTimeLength = myTime.length

    if (myTimeLength === 6) //1:00pm length is 6 (hour spot only has 1 character)
    {
        return checkIfValidTimeFormat(myTime, 1)
        
    }
    else if (myTimeLength === 7 ) //11:00am length is 7 (hour spot has 2 characters)
    {
        return checkIfValidTimeFormat(myTime, 2)
    }

    return false //time not in proper format, is invalid
    
}

const checkIfValidTimeFormat = (myTime, hourSpotLength) =>
{
    let index = 0
    let test = myTime.substring(0, hourSpotLength)
    let num = 0

    if (isNaN(test) === false) //hour spot valid
        {
            num = parseInt(test) //hour
            index = index + hourSpotLength
            test = myTime.substring(index, index+1)
            if (test === ":" && num <= 12) //hours don't go past 12 since aso using am and pm
            {
                index++
                test = myTime.substring(index, index+2) //shoud be 2 numbers for the minutes spot
                if (isNaN(test) === false)
                {
                    num = parseInt(test) //minutes
                    index = index + 2
                    test = myTime.substring(index, index+2)
                    if ((test === "am" || test === "pm") && num < 60) //minutes don't go past 60
                    {
                        return true
                    }
                }
            }
        }
        return false
}
