import './Room.css'

type propsType = {
    name: string,
    rooms: string[],
    index: number,
    edit: boolean,
    setRooms: React.Dispatch<React.SetStateAction<string[]>>
}

const Room = (props:propsType) => {

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newRooms = [...props.rooms]
        console.log(`newRooms: ${newRooms}`)
        console.log(`props.key: ${props.index}`)
        newRooms[props.index] = e.target.value
        props.setRooms(newRooms)
    }

    const createRoom = () => {
        const newRoom = [...props.rooms]
        newRoom.push('')
        props.setRooms(newRoom)
    }

    return(
        <div className='room_container'>
            {props.edit ?  
            <>
                <span>Name:</span>
                <input type='text' value={props.name} onChange={e => handleChange(e)}/>
                <img src='trash.png' alt='delete room' className='trash_room' onClick={()=>{props.setRooms(props.rooms.filter(a => a !== props.name))}}/>
            </> 
            : 
            <>
            <h4>Add Room</h4>
            <img src='plus_white.png' alt='add room' className='add_room' onClick={createRoom}/>
            </>
            }
        </div>
    )
}

export default Room