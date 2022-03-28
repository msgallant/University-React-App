import { useState } from "react"
import { UpdateBuilding } from "../actions/buildingActions";
import SubmitAction from "../action-submitter/SubmitAction";

const BuildingAddRoomForm = ({ onClose, building }) => {
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

    return (
        <div>
            <label>Add room to {building.name} </label>
            <form onSubmit={onSubmit}>
                <label>Room Number: </label>
                    <input
                    type='text'
                    value={roomNum}
                    onChange={(e) => setRoomNum(e.target.value)}
                    />

                <label>Capacity: </label>
                    <input
                    type='text'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    />

                <div>
                    <input type='submit' value='Add New Building Room' />
                </div>
            </form>

                <button onClick={onClose}>Go Back</button>
            <div>

            </div>
            {update !== null &&  
                <div>
                    <SubmitAction onComplete={() => {setUpdate(null); onClose()} }
                        ActionMethod={UpdateBuilding} data={update}></SubmitAction>
                </div>}

        </div>
    )
}

export default BuildingAddRoomForm