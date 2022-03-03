import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { buildingActionCreators } from "../actions";
import { useEffect, useState } from 'react'
import BuildingAddRoomForm from './BuildingAddRoomForm'
import BuildingRooms from "./BuildingRooms";


const Buildings = ({showBuildingAddRoomForm})=> {
    const [showRoomForm, setShowRoomForm] = useState(false)
    const [buildingID, setBuildingID] = useState(0)
    const dispatch = useDispatch()
    const { fetchBuildings, deleteBuilding } = bindActionCreators(buildingActionCreators, dispatch)

    //contains {buildingId: id, shown: true/false} shown is if the building's rooms are being shown or not  
    const [showRooms, setShowRooms] = useState([]) 
    useEffect(() => {
        fetchBuildings()
    }, [])
    
    const buildings = useSelector(state => state.buildings.items)
    //buiding ids
    const buildingRoomsShown = buildings.map(building => {
        const temp = {
            buildingId: building.id,
            shown: false}
        return temp
    })
    

    const loadShowRooms = () => {
        setShowRooms(buildingRoomsShown)
        
    }
    const closeAddRoomForm = () => {
        setShowRoomForm(false) //close room form
        //this is if buildingForm was open but the user wanted to add a room instead, buildingForm was closed
        //but building add room was closed now, so, reopen building form
        if (showBuildingAddRoomForm != null)
        {
            showBuildingAddRoomForm(false) 
        }
        
    }

    const toggleRooms = (id) => {
        const newBuildingRoomsShown = showRooms.map(buildingData => {
            if (buildingData.buildingId !== id)
            {
                return buildingData
            }
            else {
                buildingData.shown = !buildingData.shown
                return buildingData
            }})

        setShowRooms(newBuildingRoomsShown)
        
    }
    const closeAllRooms = () => {
        showRooms.forEach(buildingData => {
            buildingData.shown = false
        })
    }
    const checkIfBuildingRoomsShown = (id) => {
        if (showRooms.length !== 0)
        {
            const value = showRooms.some(buildingData => {
                if (buildingData.buildingId === id){
                   return buildingData.shown
               }
           }) 
           return value  //building rooms being shown yet or not?
        } 
            
        return false 
    }
    const showAddRoomForm = (id) => {
        setBuildingID(id)
        setShowRoomForm(true) //show room form

        //this is if buildingForm was open but the user wanted to add a room instead, buildingForm must be closed
        if (showBuildingAddRoomForm != null)
        {
            showBuildingAddRoomForm(true) //closes building form
        }
        //only show rooms for the current building that is getting a room added to it
        closeAllRooms()
        toggleRooms(id)

    }

    const addShowRoomsButton = (building) => (
        <div className="same-line select-button-color"  onClick={() => toggleRooms(building.id)}>

            <label> 
            {showRooms.length === 0 && loadShowRooms()}
            {checkIfBuildingRoomsShown(building.id) ? 'Close' : 'Show Rooms'} 
            </label>

           
        </div>
    )
    const addRoomButton = (building) => (
        <div className="same-line select-button-color"  onClick={() => showAddRoomForm(building.id)}>
            <label> Add Room </label>
        </div>
    )
    const trashCan = (building) => (
        <div className="same-line" onClick={() => deleteBuilding(building.id)}>
            <label>
                <i className="fas fa-trash-alt delete-icon-color"></i>
            </label> 
        </div>
    )

    const buildingItems = buildings.map(building => (
        <div key={building.id} className="select-div-color">
            {showRoomForm === false
            && <div>

                <label>
                name: {building.name}  &nbsp;
                </label>

                {addShowRoomsButton(building)}

                <label className="same-line building-padding"> </label>

                {addRoomButton(building)}
                    
                <label className="same-line building-padding"> </label>

                {trashCan(building)}

                
                <br/>
            </div> }

            <div>
                {showRoomForm === true
                 && buildingID === building.id 
                 && <BuildingAddRoomForm onClose={closeAddRoomForm} 
                 building={building}></BuildingAddRoomForm>}
            </div>
            
            <div>
                {checkIfBuildingRoomsShown(building.id) === true 
                 && <div>
                        <div>Current Rooms: </div>
                        <BuildingRooms onClose={toggleRooms} 
                            building={building}></BuildingRooms>
                    </div>}
                 
            </div>

        </div>
        ))

        return (
        
            <div>
                
                {showRoomForm === false
                && <div>
                    <label> Current Buildings: </label>
                </div>}
                <label>{buildingItems}</label>
            </div>
        )
    
}

export default Buildings