import './SpecialtiesSelect.css'
import { doctorSpecialties } from '../../../../../data/specialties'
type SpecialtiesSelectType = {
    specialties: string[],
    setSpecialties: React.Dispatch<React.SetStateAction<string[]>>

}
const SpecialtiesSelect = (props:SpecialtiesSelectType) => {
    return(
        <div className='specialties_select_container'>
            <label htmlFor='specialties'>Specialties:</label>
            <select name='specialties' id='specialties' key={props.specialties[0] || ''} defaultValue={''} onChange={(e)=>{if(!props.specialties.includes(e.target.value))props.setSpecialties([...props.specialties, e.target.value])}}>
                <option value='' hidden disabled/>
                {doctorSpecialties.map((specialty, index) => {
                    return <option value={specialty} key={index}>{specialty}</option>;
                })}
            </select>
            {props.specialties.map((specialty, index)=>{
                return(
                    <div className='specialties_container' key={index}>
                        <div>{specialty}<img src='red_x.png' onClick={()=>{props.setSpecialties(props.specialties.filter(function(s){ return s !== specialty}))}}/></div>
                    </div>
                )
            })}
        </div>
    )
}

export default SpecialtiesSelect