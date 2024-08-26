const operationTime = {
    start:'',
    end: '',
    start_meridiem:'',
    end_meridiem:'',
    closed:false
}

const operationHours = {
    Sunday: operationTime,
    Monday: operationTime,
    Tuesday: operationTime,
    Wednesday: operationTime,
    Thursday: operationTime,
    Friday: operationTime,
    Saturday: operationTime,
}

const defaultClinic = {
    address:'',
    city:'',
    email:'',
    fax:'',
    name:'',
    phoneNumber:'',
    postalCode:'',
    province:'',
    rooms:[],
    _id:'',
    hoursOfOperation: operationHours,
}

const defaultDoctor = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    sex: '',
    specialties: [],
    clinics: [],
    msp: '',
    color:'',
    _id:''
}

export {defaultClinic, defaultDoctor}