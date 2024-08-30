import {useState} from "react";
import "./ModalManager.css";
import PatientModal from "./patientModal/PatientModal";
import ModalContext from "../../context/modalProvider";
import ModalButtons from "./components/ModalButtons";
import DeleteModal from "./components/DeleteModal";
import { Pages } from "../../data/Pages";
import ClinicModal from "./clinicModal/ClinicModal";
import DoctorModal from "./doctorModal/DoctorModal";
import AppointmentModal from "./appointmentModal/AppointmentModal";
import Loading from "../Loading/Loading";

type PropType = {
  children: React.ReactNode;
};

const ModalManager = ({ children }: PropType) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [data, setData] = useState({});
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [callApi, setCallApi] = useState(()=>async()=>{})
  const [loading, setLoading] = useState(false)

  return (
    <ModalContext.Provider value={{showModal, setShowModal, isDelete, setIsDelete, type, setType, data, setData, callApi, setCallApi, loading, setLoading}}>
    {showModal &&
        <div className="modal_manager_container">
          <div className="modal_container">
            <div className="modals">
              {loading && <Loading/>}
              {isDelete && <DeleteModal />}
              {(!isDelete && type === Pages.Patient) && <PatientModal {...data}/>}
              {(!isDelete && type === Pages.Clinic) && <ClinicModal {...data}/>}
              {(!isDelete && type === Pages.Doctor) && <DoctorModal {...data}/>}
              {(!isDelete && type === Pages.Appointment) && <AppointmentModal {...data}/>}
            </div>
            <div className="buttons_container">
              {!isDelete && <ModalButtons/>}
            </div>
          </div>
        </div>
      }
        {children}
      </ModalContext.Provider>
  );
};

export default ModalManager;
