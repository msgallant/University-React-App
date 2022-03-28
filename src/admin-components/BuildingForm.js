import { useState } from "react"
import { buildingActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Buildings from "./Buildings";
import { building } from "./building";
import CreationForm from "../page-templates/CreationForm";
import { InputTemplate } from "../page-templates/InputTemplate";
import { CreateBuilding } from "../actions/buildingActions";
import SubmitAction from "../action-submitter/SubmitAction";

const BuildingForm = ({ onComplete }) => {
    const [buildingName, setBuildingName] = useState('')
    const [showAddRoomFormInstead, setShowAddRoomFormInstead] = useState(false)
    const [update, setUpdate] = useState(null)

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        if (!buildingName){
            alert('Name is missing')
            return
        }

        building.name = buildingName

        setUpdate(building)
    }
    
//don't show buildingForm and show BuildingAddRoomForm instead
    const toggleShowAddRoom = (value) => {
        setShowAddRoomFormInstead(value)
    }

    const buildingFormFields = (
        
        <InputTemplate thePlaceholder={'Building name '} theValue={buildingName} setTheValue={setBuildingName}>
                    </InputTemplate>   
)

    return (
        <div className="separate-different-elements">
            {showAddRoomFormInstead === false &&

                <div className="place-at-top">
                <CreationForm title={'Create a Building'} 
                    fields={buildingFormFields} submitButtonText={'Create New Building'} 
                    onSubmit={onSubmit}></CreationForm>
                </div>
            }
            <div className="place-at-top">
                <Buildings showBuildingAddRoomForm={toggleShowAddRoom}></Buildings>
            </div>

            {update !== null && 
                <div> 
                    <SubmitAction onComplete={() => {
                        setUpdate(null)
                        onComplete()}} 
                        ActionMethod={CreateBuilding} data={update}></SubmitAction>
                </div>
            }
        </div>
    )
}

export default BuildingForm