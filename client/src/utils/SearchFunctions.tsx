import { Pages } from "../data/Pages";

const filterSearch = (data: any, search:string, searchType:string, type:string) => {
    switch(searchType){
        case 'Name':
            if(type === Pages.Patient || type === Pages.Doctor){
                const fullName = (data.firstName + ' ' + data.lastName).toUpperCase()
                if(fullName.includes(search.toUpperCase())) return true
            } else {
                if(data.name.toUpperCase().includes(search.toUpperCase())) return true
            }
            break;
        case 'DOB':
            const year = data.dob.substring(0,4)
            let month = data.dob.substring(5, 7)
            const day = data.dob.substring(8,10)
            const date = new Date(month + '-' + day + '-' + year)
            month = (date.toLocaleString('default', { month: 'long' })).toUpperCase();
            const dob = month + ' ' + day + ' ' + year
            if(dob.includes(search.toUpperCase())) return true
            break;
        case 'PHN':
            if(data.phn.includes(search.toUpperCase())) return true
            break;
        case 'Fax':
        case 'Phone Number':
            console.log(data.phoneNumber)
            if(data.phoneNumber.includes(search.toUpperCase())) return true
            break;
        case 'Email':
            if(data.email.toUpperCase().includes(search.toUpperCase())) return true
            break;
        case 'City':
            if(data.city.toUpperCase().includes(search.toUpperCase())) return true
            break;
        case 'Postal Code':
            if(data.postalCode.toUpperCase().includes(search.toUpperCase())) return true
            break;
        case 'Address':
            if(data.address.toUpperCase().includes(search.toUpperCase())) return true
            break;
        case 'Province':
            if(data.province.toUpperCase().includes(search.toUpperCase())) return true
            break;
        case 'Specialty':
            for(let i = 0; i < data.specialties.length; i++){
                if(data.specialties[i].toUpperCase().includes(search.toUpperCase())) return true
            }
            break;
    }
    return false;
}

export {filterSearch}