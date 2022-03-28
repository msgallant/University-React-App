import { useState } from "react"
import TimeSlots from "./TimeSlots";
import { timeSlotWeekDays } from "./timeSlotData";
import { timeSlot } from "./timeSlot";
import { dataListValidOptionChecker } from "./dataListValidOptionChecker";
import { checkIfValidTime } from "./timeSlotFormat";
import { InputTemplate, InputDropDownListTemplate } from "../page-templates/InputTemplate";
import CreationForm from "../page-templates/CreationForm";
import SubmitAction from "../action-submitter/SubmitAction";
import { CreateTimeSlot } from "../actions/timeSlotActions";

const TimeSlotForm = ({ onComplete }) => {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [days, setDays] = useState('')
    const [update, setUpdate] = useState(null) 


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

        setUpdate(timeSlot)
    }

    
    const dayOptions = timeSlotWeekDays.map((opt, index)=> (
        <div key={index} className="select-div-color">
            <option value={opt}/>                 
        </div>
    ))

    const timeslotFormFields = (
        <div>
            <label className="block">**Time fields must be filled with the hour (1-12) : minutes (0-59) am/pm 
                (eg. 1:00pm)**
                </label> 
            <br></br>
            <InputTemplate thePlaceholder={'Start time (9:00am)'} theValue={startTime} setTheValue={setStartTime}>
                    </InputTemplate> 

            <InputTemplate thePlaceholder={'End time (10:00am)'} theValue={endTime} setTheValue={setEndTime}>
            </InputTemplate> 
            <br></br>
            <div className="sameline days-datalist-input-spacing">
                <InputDropDownListTemplate thePlaceholder={'Days: '} theValue={days} 
                    allOptions={dayOptions} setTheValue={setDays}>
                    </InputDropDownListTemplate>
            </div>
            
        </div>
         
    
)

    return (
        <div className="separate-different-elements">
            <div className="place-at-top">
                <CreationForm  title={'Create a Time Slot for a Course'} 
                    fields={timeslotFormFields} submitButtonText={'Create New Time Slot'} 
                    onSubmit={onSubmit}></CreationForm>     
                </div>   

            <div className="place-at-top">
                <TimeSlots ></TimeSlots>
            </div>
            {update !== null && 
                <div> 
                    <SubmitAction onComplete={() => {
                        setUpdate(null)
                        onComplete()}} 
                        ActionMethod={CreateTimeSlot} data={update}></SubmitAction>
                </div>
            }

        </div>
    )
}

export default TimeSlotForm