import { useState } from "react"
import { buildingActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Buildings from "./Buildings";
import { building } from "./building";
import CreationForm from "../page-templates/CreationForm";
import { InputTemplate } from "../page-templates/InputTemplate";

const BuildingForm = ({ onComplete }) => {
    const [buildingName, setBuildingName] = useState('')
    const [showAddRoomFormInstead, setShowAddRoomFormInstead] = useState(false)

    const dispatch = useDispatch()
    const { createBuilding } = bindActionCreators(buildingActionCreators, dispatch)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!buildingName){
            alert('Name is missing')
            return
        }

        building.name = buildingName


        createBuilding(building)
        onComplete()
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

        </div>
    )
}

export default BuildingForm