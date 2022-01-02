import { useState } from "react"
import { timeSlotActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import TimeSlots from "./TimeSlots";
import { timeSlotWeekDays } from "./timeSlotData";
import { timeSlot } from "./timeSlot";

const TimeSlotForm = ({ onComplete }) => {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [days, setDays] = useState('')


    const dispatch = useDispatch()
    const { createTimeSlot } = bindActionCreators(timeSlotActionCreators, dispatch)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!startTime){
            alert('Start time is missing')
            return
        }

        if (!endTime){
            alert('End time is missing')
            return
        }

        if (!days){
            alert('Days is missing')
            return
        }
        if(!checkIfValidTime(startTime)) {
            alert('Invalid start time. Please follow the format example')
            return
        }
        if(!checkIfValidTime(endTime)) {
            alert('Invalid end time. Please follow the format example')
            return
        }
        timeSlot.startTime = startTime
        timeSlot.endTime = endTime
        timeSlot.days = days

        createTimeSlot(timeSlot)
        onComplete()
    }

    //times must be in certain form (eg. 10:00am, 1:00pm)
    const checkIfValidTime = (myTime) => {

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

    const dayOptions = timeSlotWeekDays.map((opt, index)=> (
        <div key={index} className="select-div-color">
            <option value={opt}/>                 
        </div>
    ))


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Time fields must be filled with the hour (1-12) : minutes (0-59) am/pm &nbsp;
                    (eg. 1:00pm)
                </label>
                <label>Start Time: </label>
                    <input
                    type='text'
                    placeholder={"9:00am"}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    />


                <label>End time: </label>
                    <input
                    type='text'
                    placeholder={"10:00am"}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    />

                <label htmlFor="weekDays">Days: </label>
                <input list="weekDayOpts" id="weekDays" name="weekDays"
                value={days}
                onChange={(e) => setDays(e.target.value)}/>
                <datalist id="weekDayOpts" >
                    {dayOptions}
                </datalist>

                <div>
                    <input type='submit' value='Create New Subject' />
                </div>
            </form>
            <div>
                <TimeSlots></TimeSlots>
            </div>

        </div>
    )
}

export default TimeSlotForm