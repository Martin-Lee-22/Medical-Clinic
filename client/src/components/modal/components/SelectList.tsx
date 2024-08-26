import './SelectList.css'

type propTypes = {
    type: string,
    options: any,
    state: string[],
    setState:React.Dispatch<React.SetStateAction<string[]>>,
}

const SelectList = (props: propTypes) => {
    const handleChange =(e:any) => {
        let newState = [...props.state]
        if (!newState.includes(e.target.value)){
            newState.push(e.target.value)
            props.setState(newState)
        }
    }

    return(
        <div className='select_list_container'>
            <span>{props.type}: </span>
            <label htmlFor={props.type}/>
            <select name={props.type} defaultValue={''} id={props.type} onChange={e => handleChange(e)}>
                <option value='' hidden disabled/>
                {typeof props.options[0] === 'object' ? props.options.map((value:any, index:number) => {
                    return <option key={index} value={value["_id"]}>{value['name']}</option>
                }) : props.options.map((value:string, index:number) => {
                    return <option key={index} value={value}>{value}</option>
                })}
            </select>
            <div className={props.state.length === 0 ? 'selected_list_container empty_list ' : 'selected_list_container'}>
            {typeof props.options[0] === 'object' &&  props.state.length !== 0 ? props.state.sort().map((value:any, index:number) =>{
                let x:any = props.options.find((o:any) => o['_id'] === value)
                    return (
                        <div className='selected' key={index}>
                            <span>{x['name']}</span>
                            <img src='trash.png' alt='delete selected' onClick={() => props.setState(props.state.filter((_, i)=>{return i !== index}))}/>
                        </div>
                    )
                }) :
                props.state.sort().map((value:any, index:number) =>{
                    return (
                        <div className='selected' key={index}>
                            <span>{value}</span>
                            <img src='trash.png' alt='delete selected' onClick={() => props.setState(props.state.filter((_, i)=>{return i !== index}))}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectList