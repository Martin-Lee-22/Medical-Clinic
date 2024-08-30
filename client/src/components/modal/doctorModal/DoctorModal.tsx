import { useContext, useEffect, useState } from 'react'
import './DoctorModal.css'
import { formatDate } from '../../../utils/helperFunctions'
import provincesAndCities from '../../../data/provincesAndCities'
import { validatePhoneNumber, validatePostalCode, validateName } from "../../../utils/ValidateInputs";
import { postalCodeLength, phoneNumberMaxLength, phoneNumberMinLength, mspMaxLength } from '../../../data/input_restrictions'
import UploadImage from '../components/UploadImage';
import useImages from '../../../hooks/useImages';
import SelectList from '../components/SelectList';
import useClinics from '../../../hooks/useClinics';
import {objectToClinicArray } from '../../../utils/helperFunctions';
import { doctorSpecialties } from '../../../data/specialties';
import useDoctors from '../../../hooks/useDoctors';
import useModal from '../../../hooks/useModal';
import ThemeContext from '../../../context/ThemeProvider';
import titles from '../../../data/Titles';
import { title } from '../../../data/Types';

const DoctorModal  = (props:any) => {
    const [firstName, setFirstName] = useState<string>(props.firstName || '')
    const [validFirstName, setValidFirstName] = useState<boolean>(false)
    const [lastName, setLastName] = useState<string>(props.lastName || '')
    const [validLastName, setValidLastName] = useState<boolean>(false)
    const [dob, setDob] = useState<string>(formatDate(props.dob) || '')
    const [sex, setSex] = useState<string>(props.sex || '')
    const [address, setAddress] = useState<string>(props.address || '')
    const [province, setProvince] = useState<string>(props.province || '')
    const [city, setCity] = useState<string>(props.city || '')
    const [postalCode, setPostalCode] = useState<string>(props.postalCode || '')
    const [validPostalCode, setValidPostalCode] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<string>(props.phoneNumber || '')
    const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(false)
    const [email, setEmail] = useState<string>(props.email || '')
    const [msp, setMsp] = useState<string>(props.msp || '')
    const [color, setColor]= useState<string>(props.color || '#ffe08a')
    const [title, setTitle] = useState<string>(props.title || '')
    const [, setValidInputs]= useState<boolean>(false)
    const [specialties, setSpecialties] = useState<string[]>(props.specialties || [])
    const [confirmClinics, setConfirmClinics] = useState(props.clinics || [])

    const {image, setImage, createUpdateImage} = useImages(props._id || '')
    const {createDoctor, updateDoctor} = useDoctors()
    const {clinics} = useClinics()

    const {darkMode} = useContext(ThemeContext)

    const {closeModal, loadingModal} = useModal()

    useEffect(() => {
        if(firstName) setValidFirstName(validateName(firstName, false))
    }, [firstName])
    useEffect(() => {
        if(lastName) setValidLastName(validateName(lastName, false))
    }, [lastName])
    useEffect(() => {
        setValidPhoneNumber(validatePhoneNumber(phoneNumber))
    }, [phoneNumber])
    useEffect(() => {
        setValidPostalCode(validatePostalCode(postalCode))
    }, [postalCode])
    useEffect(() => {
        if(validFirstName && validLastName && validPhoneNumber && validPostalCode) setValidInputs(true)
    }, [validFirstName, validLastName, validPhoneNumber, validPostalCode])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(validFirstName && validLastName && validPhoneNumber && validPostalCode){
            const data = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                dob: dob,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                sex: sex,
                specialties: specialties,
                clinics: confirmClinics,
                msp: msp,
                color: color,
                title: title
            }
            try{
                loadingModal(true)
                if(props._id) {
                    const response = await updateDoctor(props._id, data)
                    if(response) await createUpdateImage(response._id)
                } else {
                    const response = await createDoctor(data)
                    if(response) await createUpdateImage(response._id)
                }
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setEmail('')
                setDob('')
                setAddress('')
                setCity('')
                setPostalCode('')
                setProvince('')
                setSex('')
                setMsp('')
                setSpecialties([])
                setConfirmClinics([])
                setImage('')
                setColor('')
                setTitle('')
                closeModal()
            } catch(error){
                loadingModal(false)
                console.log("Cannot Create Patient!")
                console.log(`Error: ${error}`)
            }
        }
    }

    return(
        <div className='doctor_modal_container' id={darkMode ? 'dark_doctor_modal_container':''}>
            <form className='modal_input_container input_modal_container' onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault(); }} id="doctor_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <select id='title' onChange={(e)=>{setTitle(titles[e.target.selectedIndex]['abbreviation'])}}>
                        {!title && <option hidden defaultValue={''}/>}
                        {titles.map((title:title, i:number)=>{return <option value={title.abbreviation} key={i}>{`${title.abbreviation}`}</option>})}
                    </select>
                </div>
                <div className={firstName === '' || validFirstName ? '' : "show_error_msg_container"}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id='firstName' required value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <span className={"patient_modal_error_msg " + (firstName === '' || validFirstName ? "hide" : "show_error_msg")}>* Alphabetical characters only *</span>
                </div>
                <div className={lastName === '' || validLastName ? '' : "show_error_msg_container"}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id='lastName' required value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <span className={"patient_modal_error_msg " + (lastName === '' || validLastName ? "hide" : "show_error_msg")}>* Alphabetical characters only *</span>
                </div>
                <div>
                    <label htmlFor="dob">DOB:</label>
                    <input type="date" id='dob' required value={dob} max={new Date().toISOString().split("T")[0]} onChange={e => setDob(e.target.value)}/>
                </div>
                <div id="sex_container">
                    <label htmlFor="sex">Sex:</label>
                    <input type="radio" id='male' name='sex' value={"M"} onChange={e => setSex(e.target.value)} checked={sex === "M"} required/>
                    <label htmlFor="male">M</label>
                    <input type="radio" id='female' name='sex' value={"F"} onChange={e => setSex(e.target.value)} checked={sex === "F"} required/>
                    <label htmlFor="female">F</label>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id='address' value={address} onChange={e => setAddress(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                        <select name="province" id='province' required defaultValue={province ? province : ''} onChange={e => setProvince(e.target.value)}>
                            {!province && <option defaultValue={''} hidden/>}
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
                <div className={postalCode === '' || validPostalCode ? '' : "show_error_msg_container"}>
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input type="text" id='postalCode' placeholder="V3K 6W4" size={postalCodeLength} maxLength={postalCodeLength} value={postalCode} onChange={e => setPostalCode(e.target.value.toUpperCase())}/>
                    <span className={"patient_modal_error_msg " + (postalCode === '' || validPostalCode ? "hide" : "show_error_msg")}>* 6 characters: letters & numbers *</span>
                </div>
                <div className={phoneNumber === '' || validPhoneNumber ? '' : "show_error_msg_container"}>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id='phone' placeholder="Ex:123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" size={phoneNumberMaxLength} minLength={phoneNumberMinLength} maxLength={phoneNumberMaxLength} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    <span className={"patient_modal_error_msg " + (phoneNumber === '' || validPhoneNumber ? "hide" : "show_error_msg")}>* 12-14 numbers; including '-' *</span>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="msp">MSP:</label>
                    <input type="text" inputMode='numeric' id='msp' size={mspMaxLength} maxLength={mspMaxLength} value={msp} onChange={e => setMsp(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="color">Color:</label>
                    <input type="color" id='color' className='doctor_modal_color' value={color} onChange={e => setColor(e.target.value)}/>
                </div>
            </form>
            <div className='img_container' id='dark_img_container'>
                <UploadImage image={image} setImage={setImage}/>
            </div>
            <div className='specialties_clinics_container' id={darkMode ? 'dark_specialties_clinics_container':''}>
                <SelectList type={'Clinics'} state={confirmClinics} setState={setConfirmClinics} options={objectToClinicArray(clinics, 'name', '_id')}/>
                <SelectList type={'Specialties'} state={specialties} setState={setSpecialties} options={doctorSpecialties}/>
            </div>
        </div>
    )
}

export default DoctorModal