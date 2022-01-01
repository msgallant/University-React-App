import { useState } from "react"
import { buildingActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Buildings from "./Buildings";
import { newBuilding } from "./newBuilding";


const BuildingForm = ({ onComplete }) => {
    const [buildingName, setBuildingName] = useState('')

    const dispatch = useDispatch()
    const { createBuilding } = bindActionCreators(buildingActionCreators, dispatch)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!buildingName){
            alert('Name is missing')
            return
        }

        newBuilding.name = buildingName


        createBuilding(newBuilding)
        onComplete()
    }

    return (
        <div>
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
            <div>
                <Buildings></Buildings>
            </div>

        </div>
    )
}

export default BuildingForm