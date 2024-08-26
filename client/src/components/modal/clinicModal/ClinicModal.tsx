import { useContext, useState } from 'react'
import './ClinicModal.css'
import provincesAndCities from '../../../data/provincesAndCities'
import { days, default_schedule } from '../../../data/HoursOfOperation'
import OperationHours from '../components/OperationHours'
import { phoneNumberMaxLength, phoneNumberMinLength, postalCodeLength } from '../../../data/input_restrictions'
import { axiosPrivate } from '../../../api/axios'
import useModal from '../../../hooks/useModal'
import ModalContext from '../../../context/modalProvider'
import { Pages } from '../../../data/Pages'
import useImages from '../../../hooks/useImages'
import UploadImage from '../components/UploadImage'
import Room from './component/Room'
import ThemeContext from '../../../context/ThemeProvider'

const ClinicModal = (props: any) => {
    const [name, setName] = useState(props.name || '') 
    const [address, setAddress] = useState(props.address || '') 
    const [city, setCity] = useState(props.city || '')
    const [province, setProvince] = useState(props.province || '')
    const [postalCode, setPostalCode] = useState(props.postalCode || '')
    const [phone, setPhone] = useState(props.phoneNumber || '')
    const [fax, setFax] = useState(props.fax || '')
    const [email, setEmail] = useState(props.email || '') 
    const [hoursOfOperation, setHoursOfOperation] = useState(props.hoursOfOperation || default_schedule)
    const {createUpdateImage, image, setImage} = useImages(props._id || '')

    const {closeModal} = useModal()

    const {darkMode} = useContext(ThemeContext)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            name: name,
            phoneNumber: phone,
            fax: fax,
            email: email,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            hoursOfOperation: hoursOfOperation
        }
        try{
            var response = null
            if(props._id) {
                response = await axiosPrivate.patch(`/clinics/${props._id}`, data)
                createUpdateImage(response.data._id)
                console.log('Clinic updated!')
            } else {
                response = await axiosPrivate.post('/clinics/register', data)
                console.log('Clinic Created!')
            }
            createUpdateImage(response.data._id)
            console.log('Image uploaded successfully!')
            setName('')
            setPhone('')
            setEmail('')
            setAddress('')
            setCity('')
            setPostalCode('')
            setFax('')
            setImage('')
            setHoursOfOperation(default_schedule)
            closeModal()
        } catch(error){
            console.log("Cannot Create Clinic!")
            console.log(`Error: ${error}`)
        }
    }

    return(
        <div className="clinic_modal_container" id={darkMode ? 'dark_clinic_modal_container':''}>
            <form className='modal_input_container input_modal_container' onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault(); }} id="clinic_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type="text" id='name' required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='address'>Address:</label>
                    <input type="text" id='address' required value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                        <select name="province" id='province' required defaultValue={province ? province : ''} onChange={e => setProvince(e.target.value)}>
                            <option defaultValue={''} disabled/>
                            {Object.entries(provincesAndCities).map(([key, value], index) => {
                                return <option key={index} value={key}>{value.abbreviation}</option>
                            })}
                        </select>
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                        <input list="city" disabled={province ? false : true} value={city} onChange={e => setCity(e.target.value)} required/>
                        <datalist id="city">
                            { province && provincesAndCities[province]['cities'].map((city, index) => {
                                return <option key={index} value={city}/>
                            })}
                        </datalist>
                </div>
                <div>
                    <label htmlFor='postalCode'>Postal Code:</label>
                    <input type="text" id='postalCode' placeholder="V3K 6W4" size={postalCodeLength} maxLength={postalCodeLength} required value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='Phone'>Phone:</label>
                    <input type="tel" id='Phone' placeholder="Ex:123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" size={phoneNumberMaxLength} minLength={phoneNumberMinLength} maxLength={phoneNumberMaxLength} value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='fax'>Fax:</label>
                    <input type="tel" id='fax' placeholder="Ex:123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" size={phoneNumberMaxLength} minLength={phoneNumberMinLength} maxLength={phoneNumberMaxLength} value={fax} onChange={e => setFax(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
            </form>
            <table className="schedule_container">
                <thead>
                    <tr>
                        <th colSpan={3}>Hours of Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, index) => {
                        return (
                            <OperationHours key={index} day={day} hoursOfOperation={hoursOfOperation} setHoursOfOperation={setHoursOfOperation}/>                            
                        )
                    })}
                </tbody>
            </table>
            <div className="img_container" id={darkMode ? 'dark_img_container':''}>
                <UploadImage image={image} setImage={setImage}/>
            </div>
        </div>
    )
}

export default ClinicModal