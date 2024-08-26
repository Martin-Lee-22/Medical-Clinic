type day = {
    start: string,
    end:string,
    start_meridiem:string,
    end_meridiem:string,
    close:boolean
}

type schedule = {
    Sunday: day,
    Monday: day,
    Tuesday: day,
    Wednesday: day,
    Thursday: day,
    Friday: day,
    Saturday: day
}

type clinics = {
    address:string,
    city:string,
    email:string,
    fax:string,
    name:string,
    phoneNumber:string,
    postalCode:string,
    province:string,
    rooms:string[],
    _id:string,
    hoursOfOperation: operationHours,
}

type operationHours = {
    Sunday: operationTime,
    Monday: operationTime,
    Tuesday: operationTime,
    Wednesday: operationTime,
    Thursday: operationTime,
    Friday: operationTime,
    Saturday: operationTime,
}

type operationTime = {
    start:string,
    end: string,
    start_meridiem:string,
    end_meridiem:string,
    closed:boolean
}

type doctor = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    dob: string,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    sex: string,
    specialties: string[],
    clinics: string[],
    msp: string,
    color:string,
    _id:string
}

type patient = {
    address: string,
    city: string,
    conditions: [string],
    createdAt: string,
    creditCard: string,
    dob: string,
    email: string,
    firstName: string,
    lastName: string,
    medications: [string],
    phn: string,
    phoneNumber: string,
    postalCode: string,
    province: string,
    sex: string,
    _id: string
}

type appointment = {
    startDate: Date,
    endDate: Date,
    doctorID: string,
    patientID: string,
    patientName: string,
    clinicID:  string,
    description: string,
    complete: boolean,
    paid: boolean,
    price: number,
    doctorName?: string,
    availableTimes?: time[]
}

type time = {
    hour: number;
    minute: number;
    meridiem: string;
}

type title = {
    abbreviation:string,
    title:string
}

export type {day, schedule, clinics, doctor, patient, appointment, time, title}