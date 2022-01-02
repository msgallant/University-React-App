import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { timeSlotActionCreators } from "../actions";
import { useEffect } from 'react'

const TimeSlots = ()=> {
    const dispatch = useDispatch()
    const { fetchTimeSlots, deleteTimeSlot } = bindActionCreators(timeSlotActionCreators, dispatch)

    useEffect(() => {
        fetchTimeSlots()
    }, [])

    const timeSlots = useSelector(state => state.timeSlots.items)

    const timeSlotItems = timeSlots.map(slot => (
        <div key={slot.id} className="select-div-color">
            <div>
                <label>
                     {slot.startTime} - {slot.endTime } on {slot.days}  
                </label>

                <label onClick={() => deleteTimeSlot(slot.id)}>
                    <i className="fas fa-trash-alt delete-icon-color"></i>
                </label>
            </div>
                
        </div>
        ))

        return (
        
            <div>
                <div>
                    <label> Current Time Slots: </label>
                </div>
                <div>
                    <label>{timeSlotItems}</label>
    
                </div>
            </div>
        )
    
}

export default TimeSlots