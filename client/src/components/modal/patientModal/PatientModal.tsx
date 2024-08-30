import "./PatientModal.css";
import provincesAndCities
from "../../../data/provincesAndCities";
import {useState, useEffect, useContext } from "react";
import ConditionsMedications from "./components/ConditionsMedications";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { validatePhn, validatePhoneNumber, validatePostalCode, validateName } from "../../../utils/ValidateInputs";
import PastAppointments from "./components/PastAppointments";
import { formatDate, objectToClinicArray } from "../../../utils/helperFunctions";
import useModal from "../../../hooks/useModal";
import { creditCardLength, postalCodeLength, phnLength, phoneNumberMaxLength, phoneNumberMinLength } from "../../../data/input_restrictions";
import SelectList from "../components/SelectList";
import useClinics from "../../../hooks/useClinics";
import useAppointments from "../../../hooks/useAppointments";
import ThemeContext from "../../../context/ThemeProvider";

const PatientModal = (props:any) => {
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
    const [conditions, setConditions] = useState<string[]>(props.conditions || [])
    const [medications, setMedications] = useState<string[]>(props.medications || [])
    const [phn, setPhn] = useState<string>(props.phn || '')
    const [validPhn, setValidPhn] = useState<boolean>(false)
    const [insurance, setInsurance] = useState<string>(props.insurance || '')
    const [creditCard, setCreditCard] = useState<string>(props.creditCard ||'')
    const [validInputs, setValidInputs]= useState<boolean>(false)
    const [confirmClinics, setConfirmClinics] = useState(props.clinics || [])
    
    const {clinics} = useClinics()
    const {closeModal, loadingModal} = useModal()

    const {appointments, getAppointmentsPatientID} = useAppointments()

    const axiosPrivate = useAxiosPrivate()

    const {darkMode} = useContext(ThemeContext)

    useEffect(() => {
        if(firstName) setValidFirstName(validateName(firstName, false))
    }, [firstName])
    useEffect(() => {
        if(lastName) setValidLastName(validateName(lastName, false))
    }, [lastName])
    useEffect(() => {
        setValidPhn(validatePhn(phn))
    }, [phn])
    useEffect(() => {
        setValidPhoneNumber(validatePhoneNumber(phoneNumber))
    }, [phoneNumber])
    useEffect(() => {
        setValidPostalCode(validatePostalCode(postalCode))
    }, [postalCode])
    useEffect(() => {
        if(validFirstName && validLastName && validPhn && validPhoneNumber && validPostalCode) setValidInputs(true)
    }, [validFirstName, validLastName, validPhn, validPhoneNumber, validPostalCode])

    useEffect(()=>{
        if(props._id) getAppointmentsPatientID(props._id)
    }, [props._id])

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(validFirstName && validLastName && validPhn && validPhoneNumber && validPostalCode){
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
                conditions: conditions,
                medications: medications,
                insurance: insurance,
                creditCard: creditCard,
                phn: phn,
                clinics: confirmClinics
            }
            try{
                loadingModal(true)
                if(props._id) {
                    await axiosPrivate.patch(`/patients/${props._id}`, data)
                    console.log('Patient Updated!')
                } else {
                    await axiosPrivate.post('/patients/register', data)
                    console.log('Patient Created!')
                }
                closeModal()
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setEmail('')
                setDob('')
                setAddress('')
                setCity('')
                setPostalCode('')
                setSex('')
                setConditions([])
                setMedications([])
                setInsurance('')
                setCreditCard('')
                setPhn('')
            } catch(error){
                loadingModal(false)
                console.log("Cannot Create Patient!")
                console.log(`Error: ${error}`)
            }
        }
    }

  return (
    <div className="patient_modal_container">
        <div className="input_conditions_container" id={darkMode ? 'dark_input_conditions_container':''}>
            <form className='patient_modal_input_container' onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault(); }} id="patient_form" onSubmit={handleSubmit}>
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
                <div className={phn === '' || validPhn ? '' : "show_error_msg_container"}>
                    <label htmlFor="phn">PHN:</label>
                    <input type="text" id='phn' value={phn} maxLength={phnLength} size={phnLength} onChange={e => setPhn(e.target.value)}/>
                    <span className={"patient_modal_error_msg " + (phn === '' || validPhn ? "hide" : "show_error_msg")}>* 10 numeric characters *</span>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id='address' value={address} onChange={e => setAddress(e.target.value)}/>
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
                    <label htmlFor="insurance">Insurance:</label>
                    <input type="text" id='insurance' value={insurance} onChange={e => setInsurance(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="creditCard">Credit Card:</label>
                    <input type="text" id='creditCard' minLength={creditCardLength} maxLength={creditCardLength} value={creditCard} onChange={e => setCreditCard(e.target.value)}/>
                </div>
            </form>
            <div className="conditions_medication_clinics_container">
                <div className="medical_conditions_container">
                    <ConditionsMedications conditions={conditions} setConditions={setConditions} medications={medications} setMedications={setMedications} medication={false}/>
                </div>
                <div className="medications_container">
                    <ConditionsMedications conditions={conditions} setConditions={setConditions} medications={medications} setMedications={setMedications} medication={true}/>
                </div>
                <div className="clinics_container" id={darkMode ? 'dark_clinics_container':''}>
                    <SelectList type={'Clinics'} state={confirmClinics} setState={setConfirmClinics} options={objectToClinicArray(clinics, 'name', '_id')}/>
                </div>
            </div>
        </div>
    <div className="past_appointments_container" id={darkMode ? 'dark_past_appointments_container':''}>
        <PastAppointments appointments={appointments}/>
    </div> 
    </div>
  );
};

export default PatientModal;