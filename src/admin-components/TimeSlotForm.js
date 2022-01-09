import { useState } from "react"
import { timeSlotActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import TimeSlots from "./TimeSlots";
import { timeSlotWeekDays } from "./timeSlotData";
import { timeSlot } from "./timeSlot";
import { dataListValidOptionChecker } from "./dataListValidOptionChecker";
import { checkIfValidTime } from "./timeSlotFormat";

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

        //sees if days matches with one of the valid options which are listed in the array timeSlotWeekDays
        if (!dataListValidOptionChecker(timeSlotWeekDays, days))
        {
            alert('Invalid days')
            return
        }
        timeSlot.days = days

        timeSlot.name = startTime + " - " + endTime + " on " + days + " "

        createTimeSlot(timeSlot)
        onComplete()
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