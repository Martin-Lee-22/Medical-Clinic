const {
    MISSING_REQUIRED_DOCTOR_INFO,
    DOCTOR_ALREADY_EXISTS,
    CANNOT_FIND_DOCTOR,
    CANNOT_FIND_AND_DELETE_DOCTOR,
    CANNOT_FIND_AND_UPDATE_DOCTOR
  } = require("../../Constants/errorCodes");
  
  const doctorErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {
      case MISSING_REQUIRED_DOCTOR_INFO:
        statusCode = 400;
        errorMessage =
          "Please enter the required first name, last name, and date of birth, and sex of doctor";
          break;
  
      case DOCTOR_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "A Doctor with those credintials already exists";
        break;
  
      case CANNOT_FIND_DOCTOR:
        statusCode = 404;
        errorMessage = "Cannot find Doctor with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_DOCTOR:
        statusCode = 404;
        errorMessage = "Cannot find and delete Doctor with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_DOCTOR:
        statusCode = 404;
        errorMessage = "Cannot find and update Doctor with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in Doctor controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = doctorErrorHandler;
  