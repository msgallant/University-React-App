

const BuildingRooms = ({building})=> {


    var myKey = 0

    const incrementKey = () => {
        myKey++
    }
    const buildingRoomItems = building.rooms.map(room => (
        <div key={myKey} className="select-div-color">
            {incrementKey()}
            <label>Room Number: {room.roomNum} &nbsp; </label>
            <label>Capacity: {room.capacity} </label>
        </div>
    ))

        return (
        
            <div>
                
                {buildingRoomItems}
    
            </div>
        )
    
}

export default BuildingRooms