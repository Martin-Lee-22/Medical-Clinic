import {createContext} from "react";

type ModalContextType = {
    showModal: boolean | null,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    type: string,
    setType: React.Dispatch<React.SetStateAction<string>>,
    data: {[key:string]:any},
    setData: React.Dispatch<React.SetStateAction<{}>>
    isDelete: boolean | null,
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>,
    callApi: ()=>void,
    setCallApi: React.Dispatch<React.SetStateAction<() => Promise<void>>>,
  }
  
const ModalContextState = {
    showModal: null,
    setShowModal: () => {},
    type: '',
    setType: () => {},
    data: {},
    setData: () => {},
    isDelete: null,
    setIsDelete: () => {},
    callApi: ()=>{},
    setCallApi: () =>async ()=>Promise<void>
}

const ModalContext = createContext<ModalContextType>(ModalContextState)

export default ModalContext