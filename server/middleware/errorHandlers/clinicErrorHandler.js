const {
    MISSING_REQUIRED_CLINIC_INFO,
    CLINIC_ALREADY_EXISTS,
    CANNOT_FIND_CLINIC,
    CANNOT_FIND_AND_DELETE_CLINIC,
    CANNOT_FIND_AND_UPDATE_CLINIC
  } = require("../../Constants/errorCodes");
  
  const clinicErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {
      case MISSING_REQUIRED_CLINIC_INFO:
        statusCode = 400;
        errorMessage =
          "Please enter the required name, address, city, province, postal code, and phone number of clinic";
          break;
  
      case CLINIC_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "A clinic with those credintials already exists";
        break;
  
      case CANNOT_FIND_CLINIC:
        statusCode = 404;
        errorMessage = "Cannot find clinic with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_CLINIC:
        statusCode = 404;
        errorMessage = "Cannot find and delete clinic with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_CLINIC:
        statusCode = 404;
        errorMessage = "Cannot find and update clinic with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in Clinic controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = clinicErrorHandler;
  