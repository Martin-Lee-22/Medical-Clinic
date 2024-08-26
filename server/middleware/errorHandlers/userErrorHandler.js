const {
  MISSING_USER_INFO,
  USER_ALREADY_EXISTS,
  CANNOT_FIND_USER,
} = require("../../Constants/errorCodes");

const userErrorHandler = (error, req, res, next) => {
  console.log(error);
  var statusCode = null;
  var errorMessage = null;

  switch (error.errorCode) {
    case MISSING_USER_INFO:
      statusCode = 400;
      errorMessage =
        "Please enter Name, Email, and Password to create account";
        break;

    case USER_ALREADY_EXISTS:
      statusCode = 406;
      errorMessage = "A user with that email already exists";
      break;

    case CANNOT_FIND_USER:
      statusCode = 404;
      errorMessage = "Cannot find user with that ID";
      break;

    case CANNOT_FIND_AND_DELETE_USER:
      statusCode = 404;
      errorMessage = "Cannot find and delete user with that ID";
      break;

    case CANNOT_FIND_AND_UPDATE_USER:
      statusCode = 404;
      errorMessage = "Cannot find and update user with that ID";
      break;

    default:
      statusCode = 500;
      errorMessage =
        "An Error has occurred in User controller. Cannot determine reason of error";
  }

  console.log(`Error Detected: ${errorMessage}`);
  return res.status(statusCode).json({ message: errorMessage });
};

module.exports = userErrorHandler;
