const {
    MISSING_REQUIRED_ROOM_INFO,
    ROOM_ALREADY_EXISTS,
    CANNOT_FIND_ROOM,
    CANNOT_FIND_AND_DELETE_ROOM,
    CANNOT_FIND_AND_UPDATE_ROOM
  } = require("../../Constants/errorCodes");
  
  const roomErrorHandler = (error, req, res, next) => {
    console.log(error);
    var statusCode = null;
    var errorMessage = null;
  
    switch (error.errorCode) {
      case MISSING_REQUIRED_ROOM_INFO:
        statusCode = 400;
        errorMessage =
          "Please enter the required name and Clinic ID of room";
          break;
  
      case ROOM_ALREADY_EXISTS:
        statusCode = 406;
        errorMessage = "A room with the same name already exists";
        break;
  
      case CANNOT_FIND_ROOM:
        statusCode = 404;
        errorMessage = "Cannot find room with that ID";
        break;
  
      case CANNOT_FIND_AND_DELETE_ROOM:
        statusCode = 404;
        errorMessage = "Cannot find and delete room with that ID";
        break;
  
      case CANNOT_FIND_AND_UPDATE_ROOM:
        statusCode = 404;
        errorMessage = "Cannot find and update room with that ID";
        break;
  
      default:
        statusCode = 500;
        errorMessage =
          "An Error has occurred in room controller. Cannot determine reason of error";
    }
  
    console.log(`Error Detected: ${errorMessage}`);
    return res.status(statusCode).json({ message: errorMessage });
  };
  
  module.exports = roomErrorHandler;
  