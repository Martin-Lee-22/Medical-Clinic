function validateName(name:string, space:boolean){
    let NAME_REGEX = undefined
    if(space){
        // only empty space and lower/uppercase letters.
        NAME_REGEX = /^[a-zA-Z ]*$/}
    else {
        // only accepts lowercase and uppercase letters.
        NAME_REGEX = /^[a-zA-Z]*$/
    }
    let result = NAME_REGEX.test(name)
    return result
}

function validateEmail(email: string){
    // Check to see if email is properly formatted.
    let EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let result = EMAIL_REGEX.test(email)
    return result
}

function validatePassword(password:string){
    //  8-24 characters, at least one letter and one number:
    let PASSWORD_REGEX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/ //eslint-disable-line
    let result = PASSWORD_REGEX.test(password)
    return result
}

function validatePhn(phn:string){
    let PHN_REGEX = /[0-9]{10}/
    let result = PHN_REGEX.test(phn)
    return result
}

function validatePhoneNumber(phoneNumber:string){
    let PHONE_NUMBER_REGEX = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    let result = PHONE_NUMBER_REGEX.test(phoneNumber)
    return result
}

function validatePostalCode(postalCode:string){
    let POSTAL_CODE_REGEX = /([A-Z]\d){3}/
    let result = POSTAL_CODE_REGEX.test(postalCode)
    return result
}

export {validateName, validateEmail, validatePassword, validatePhn, validatePhoneNumber, validatePostalCode}