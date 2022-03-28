import { useSelector } from "react-redux";
import { useState } from "react";
import SubmitAction from "../action-submitter/SubmitAction";
import BorderedList from "../page-templates/BorderedList";
import { FetchTimeSlots, DeleteTimeSlot   } from "../actions/timeSlotActions";

const TimeSlots = ()=> {
    const [deleteObjID, setDeleteObjID] = useState(null)
    FetchTimeSlots()


    const timeSlots = useSelector(state => state.timeSlots.items)

    const timeSlotItems = timeSlots.map(slot => (
        <div key={slot.id} className="select-div-color">
            <div>
                <label>
                     {slot.name}
                </label>

                <label onClick={() => setDeleteObjID(slot.id)}>
                    <i className="fas fa-trash-alt delete-icon-color"></i>
                </label>
            </div>
                
        </div>
        ))

        return (
            <div>
                <BorderedList itemListTitleName={"Current Time Slots: "} listItems={timeSlotItems}></BorderedList>
                {deleteObjID !== null && 
                    <div>
                        <SubmitAction onComplete={() => setDeleteObjID(null)} 
                                ActionMethod={DeleteTimeSlot} data={deleteObjID}></SubmitAction>
                    </div>}
            </div>
            

        )
    
}

export default TimeSlots