const {
    MISSING_REQUIRED_PATIENT_INFO,
    PATIENT_ALREADY_EXISTS,
    CANNOT_FIND_PATIENT,
    CANNOT_FIND_AND_DELETE_PATIENT,
    CANNOT_FIND_AND_UPDATE_PATIENT
  } = require("../../Constants/errorCodes");
  
  const patientErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {
      case MISSING_REQUIRED_PATIENT_INFO:
        statusCode = 400;
        errorMessage =
          "Please enter the required first name, last name, and date of birth, and sex of patient";
          break;
  
      case PATIENT_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "A patient with those credintials already exists";
        break;
  
      case CANNOT_FIND_PATIENT:
        statusCode = 404;
        errorMessage = "Cannot find patient with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_PATIENT:
        statusCode = 404;
        errorMessage = "Cannot find and delete patient with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_PATIENT:
        statusCode = 404;
        errorMessage = "Cannot find and update patient with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in patient controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = patientErrorHandler;
  