import { useState } from "react"
import { buildingActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const BuildingAddRoomForm = ({ onClose, building }) => {
    const [roomNum, setRoomNum] = useState('')
    const [capacity, setCapacity] = useState('')

    const dispatch = useDispatch()
    const { addBuildingRoom } = bindActionCreators(buildingActionCreators, dispatch)

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

        addBuildingRoom(building)
        onClose()
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

        </div>
    )
}

export default BuildingAddRoomForm