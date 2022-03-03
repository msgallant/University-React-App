import { useState } from "react"
import { buildingActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Buildings from "./Buildings";
import { building } from "./building";


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

    return (
        <div>
            {showAddRoomFormInstead === false &&
                <form onSubmit={onSubmit}>
                    <label>Building name: </label>
                        <input
                        type='text'
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                        />

                    <div>
                        <input type='submit' value='Create New Building' />
                    </div>
                </form>
            }
            <div>
                <Buildings showBuildingAddRoomForm={toggleShowAddRoom}></Buildings>
            </div>

        </div>
    )
}

export default BuildingForm