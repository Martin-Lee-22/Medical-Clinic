const {
    MISSING_REQUIRED_APPOINTMENT_INFO,
    APPOINTMENT_ALREADY_EXISTS,
    CANNOT_FIND_APPOINTMENT,
    CANNOT_FIND_AND_DELETE_APPOINTMENT,
    CANNOT_FIND_AND_UPDATE_APPOINTMENT
  } = require("../../Constants/errorCodes");
  
  const appointmentErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {
      case MISSING_REQUIRED_APPOINTMENT_INFO:
        statusCode = 400;
        errorMessage =
          "Please enter the required date, start time, end time, clinic ID, doctor ID, room ID, and patient ID";
          break;
  
      case APPOINTMENT_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "An appointment with those credintials already exists";
        break;
  
      case CANNOT_FIND_APPOINTMENT:
        statusCode = 404;
        errorMessage = "Cannot find appointment with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_APPOINTMENT:
        statusCode = 404;
        errorMessage = "Cannot find and delete appointment with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_APPOINTMENT:
        statusCode = 404;
        errorMessage = "Cannot find and update appointment with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in Appointment controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = appointmentErrorHandler;
  