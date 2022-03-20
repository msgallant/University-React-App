import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { timeSlotActionCreators } from "../actions";
import { useEffect } from 'react'
import BorderedList from "../page-templates/BorderedList";

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
                     {slot.name}
                </label>

                <label onClick={() => deleteTimeSlot(slot.id)}>
                    <i className="fas fa-trash-alt delete-icon-color"></i>
                </label>
            </div>
                
        </div>
        ))

        return (
            <BorderedList itemListTitleName={"Current Time Slots: "} listItems={timeSlotItems}></BorderedList>

        )
    
}

export default TimeSlots