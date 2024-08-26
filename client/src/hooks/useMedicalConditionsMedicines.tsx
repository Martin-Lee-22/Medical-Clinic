import { useEffect, useState } from "react"
import axios from "../api/axios";

const useConditionsMedicines = (condition: string, drug:boolean) => {
    const [conditionsMedicine, setConditionsMedicine] = useState<string[]>([])
    
    useEffect(() =>{
        getConditions(condition);
    }, [condition])


    const getConditions = async (x: string) => {
        try{
            var response = null;
            if(drug) {
                response = await axios.get(`https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${x}`)
            } else {
                response = await axios.get(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${x}&df=primary_name`)
            }
          
            const medicalConditions = response.data[3].map((value:string[])=>{
                return value[0]
            })
            setConditionsMedicine(medicalConditions);
        } catch(error){
            console.log('Error in retrieving Medical Conditions / Medicines!')
            console.log(error)
        }
    }
    
    return conditionsMedicine
}

export default useConditionsMedicines