import { useRef } from 'react'
import './UploadImage.css'
import { convertToBase64 } from '../../../utils/helperFunctions'

type propsType = {
    image:string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}

const UploadImage = (props:propsType) => {
    const input_img = useRef<HTMLInputElement>(null)
    return(
        <div className='upload_img_container'>
            <div className='upload_img_input_container' onClick={() => {input_img.current?.click()}}>
            <img src={props.image ? 'plus_white.png' : 'upload_img.png'} alt='add image' className='add_img'/>
            {props.image == '' || props.image == null ? '' : <img src={props.image} alt='preview of img' className='img_preview'/>}
                <input type="file" id="image" ref={input_img} hidden name="image" accept="image/*" onChange={(e) => {convertToBase64(e, props.setImage)}} />
            </div>
            <button className='refresh_button' onClick={()=>{props.setImage('')}}>
                <img src='refresh.png' alt='refresh button'/>
            </button>
        </div>
    )
}

export default UploadImage