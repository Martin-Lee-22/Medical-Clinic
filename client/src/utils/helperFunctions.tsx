const formatDate = (dob: string) => {
    if(dob){
        return new Date(Date.parse(dob)).toISOString().slice(0, 10)
    }
    return null
}

const formatNumber = (phoneNumber: string) => {
    if(phoneNumber.search('-') === -1){
        const length = phoneNumber.length
        return '(' + phoneNumber.slice(0,3) + ')-' + phoneNumber.slice(3,6) + '-' + phoneNumber.slice(6,length)
    }
    return phoneNumber
}

const objectToArray = (objects:object[], key:string) => {
    var newArray:string[] = []
    objects.map((object, index) => {
        return newArray.push(object[key as keyof object])
    })
    return newArray
}

const objectToClinicArray = (objects:object[], name:string, id:string) => {
    var newArray:{}[] = []
    objects.map((object, index) => {
        let x = {
            name: object[name as keyof object],
            _id: object[id as keyof object]
        }
        return newArray.push(x)
    })
    return newArray
}

function convertToBase64(e:any, callback:any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        callback(reader.result) // So that we can immediately see the image that we uploaded.
    }
    reader.onerror = error => {
        console.log('Error: ', error);
    }
}

function sameDay(d1:Date, d2:Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}

const convertTime12to24 = (hour:number, modifier:string) => {
    var newHours = hour
    if(hour === 12 && modifier === 'AM') return 0
    if (modifier === 'PM'){
        if(hour !== 12){
            newHours = hour + 12;
        } else {
            newHours = hour + 0
        }
    } 
    return newHours;
  }
  

export {formatDate, formatNumber, convertToBase64, objectToArray, objectToClinicArray, sameDay, convertTime12to24}