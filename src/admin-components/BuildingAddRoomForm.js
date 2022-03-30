import { useState } from "react"
import { UpdateBuilding } from "../actions/buildingActions";
import SubmitAction from "../action-submitter/SubmitAction";
import { InputTemplate } from "../page-templates/InputTemplate";
import CreationForm from "../page-templates/CreationForm";
import { GoBackButtonTemplate } from "../page-templates/ButtonTemplate";
import { VIEW_BUILDINGS_PAGE_NAME } from "../pageNames";

const BuildingAddRoomForm = ({ openBuildingsForm, building }) => {
    const [roomNum, setRoomNum] = useState('')
    const [capacity, setCapacity] = useState('')
    const [update, setUpdate] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!roomNum){
            alert('Room number is missing')
            return
        }
        if (!capacity){
            alert('Capacity is missing')
            return
        }

        const rooms = {
            roomNum: roomNum,
            capacity: capacity
        }
        building.rooms.push(rooms)

        setUpdate(building)
    }

    const buildingRoomFormFields = (
        <div>
            <InputTemplate thePlaceholder={'Room Number'} theValue={roomNum} setTheValue={setRoomNum}>
                    </InputTemplate>   
            <InputTemplate thePlaceholder={'Capacity'} theValue={capacity} setTheValue={setCapacity}>
                    </InputTemplate> 
        </div>
         
)

    return (
        <div>

                <CreationForm title={'Add room to ' + building.name} 
                    fields={buildingRoomFormFields} submitButtonText={'Add New Building Room'} 
                    onSubmit={onSubmit}></CreationForm>
    
                <div className="plain-border hidden">
                    <div className="unhidden">
                        <GoBackButtonTemplate onClickEventFunc={() => 
                        {openBuildingsForm(VIEW_BUILDINGS_PAGE_NAME)}} theText={"Go Back"}
                            ></GoBackButtonTemplate>
                    </div>
                    
                </div>
               
            <div>

            

            </div>
            {update !== null &&  
                <div>
                    <SubmitAction onComplete={() => {setUpdate(null); openBuildingsForm(VIEW_BUILDINGS_PAGE_NAME)} }
                        ActionMethod={UpdateBuilding} data={update}></SubmitAction>
                </div>}

        </div>
    )
}

export default BuildingAddRoomForm