const scheduleModel = require("../Models/schedule");
const asyncHandler = require("express-async-handler");
const AppError = require("../AppError.js");
const {
  SCHEDULE_ALREADY_EXISTS,
  CANNOT_FIND_SCHEDULE,
  CANNOT_FIND_AND_DELETE_SCHEDULE,
  CANNOT_FIND_AND_UPDATE_SCHEDULE,
} = require("../Constants/errorCodes");

const createSchedule = asyncHandler(async (req, res) => {
  const foundSchedule = await scheduleModel.findOne({source: req.body.source,});
  if (foundSchedule) throw new AppError(SCHEDULE_ALREADY_EXISTS);

  var newInfo = { source: req.body.source };
  Object.keys(req.body).forEach((prop) => {
    if (prop !== "source") {
      newInfo[prop] = {
        available: req.body[prop]["available"] || false,
        startTime: req.body[prop]["startTime"] || '',
        endTime: req.body[prop]["endTime"] || '',
      };
    }
  });

  const schedule = await scheduleModel.create(newInfo);
  console.log(`Created new Schedule: ${schedule}`);
  res.status(200).json(schedule);
});

const getSchedules = asyncHandler(async(req, res) => {
    const schedules = await scheduleModel.find({})
    console.log(`Send Schedules: ${schedules}`);
    res.status(200).json(schedules)
})

const getSchedule = asyncHandler(async(req, res) => {
    const schedule = await scheduleModel.findById(req.params.id)
    if(!schedule) throw new AppError(CANNOT_FIND_SCHEDULE)
    console.log(`Send Schedule: ${schedule}`)
    res.status(200).json(schedule)
})

const deleteSchedule = asyncHandler(async(req, res) => {
    const schedule = await scheduleModel.findByIdAndDelete(req.params.id)
    if(!schedule) throw new AppError(CANNOT_FIND_AND_DELETE_SCHEDULE)
    console.log(`A schedule has been deleted: ${schedule}`)
    res.status(200).end()
})

const updateSchedule = asyncHandler(async(req, res) => {
    var newInfo = { source: req.body.source };
    Object.keys(req.body).forEach((prop) => {
        if (prop !== "source") {
        newInfo[prop] = {
            available: req.body[prop]["available"] || false,
            startTime: req.body[prop]["startTime"] || '',
            endTime: req.body[prop]["endTime"] || '',
        };
    }
  });
    const schedule = await scheduleModel.findByIdAndUpdate(req.params.id, newInfo, {new:true});
    if(!schedule) throw new AppError(CANNOT_FIND_AND_UPDATE_SCHEDULE)
    res.status(200).json(schedule)
})

module.exports = { createSchedule, getSchedules, getSchedule, deleteSchedule, updateSchedule};
