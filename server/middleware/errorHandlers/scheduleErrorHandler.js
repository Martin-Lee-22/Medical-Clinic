const {
    SCHEDULE_ALREADY_EXISTS,
    CANNOT_FIND_SCHEDULE,
    CANNOT_FIND_AND_DELETE_SCHEDULE,
    CANNOT_FIND_AND_UPDATE_SCHEDULE
  } = require("../../Constants/errorCodes");
  
  const scheduleErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {  
      case SCHEDULE_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "A schedule from the Clinic or Dr. already exists";
        break;
  
      case CANNOT_FIND_SCHEDULE:
        statusCode = 404;
        errorMessage = "Cannot find schedule with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_SCHEDULE:
        statusCode = 404;
        errorMessage = "Cannot find and delete schedule with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_SCHEDULE:
        statusCode = 404;
        errorMessage = "Cannot find and update schedule with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in schedule controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = scheduleErrorHandler;
  