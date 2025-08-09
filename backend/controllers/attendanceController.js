import asyncHandler from "../middleware/asyncHandler.js";
import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";

const getAttendanceList = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 10;
  const page = Number(req.query.pageNumber) || 1;

  // console.log("Page:", page);

  // Keyword filter (by name)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Date range filter
  const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
  const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

  let dateFilter = {};
  if (startDate && endDate) {
    dateFilter.date = { $gte: startDate, $lte: endDate };
  } else if (startDate) {
    dateFilter.date = { $gte: startDate };
  } else if (endDate) {
    dateFilter.date = { $lte: endDate };
  }

  // Combine filters
  const filter = { ...keyword, ...dateFilter };

  const count = await Attendance.countDocuments(filter);
  const attendences = await Attendance.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ date: -1 });

  res.json({
    attendences,
    page,
    pages: Math.ceil(count / pageSize),
  });
});


const getTodayAttendences = asyncHandler(async (req, res) => {
  const now = new Date(); // e.g., 2025-05-24T16:49:29.885Z
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Convert to start of the day in UTC
  const startOfDayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const start = new Date(startOfDayUTC);
  const end = new Date(startOfDayUTC);

  end.setUTCDate(end.getUTCDate() + 1); // Add one day safely in UTC

  const attendences = await Attendance.find({
    ...keyword,
    date: {
      $gte: start,
      $lt: end,
    },
  });

  if (attendences) {
    res.json(attendences);
  } else {
    res.status(404);
    throw new Error("Today Time Table is not available");
  }
  // const results = await Attendance.find({
  //   date: {
  //     $gte: start,
  //     $lt: end,
  //   },
  // });
  // res.json({ results });
});
const getMyAttendance = asyncHandler(async (req, res) => {
  console.log(req.params.empId );
  const attendences = await Attendance.find({empId: req.params.empId})
  .sort({date: -1 });
  if (attendences) {
    res.json(attendences);
  } else {
    res.status(404);
    throw new Error('attendences is  not found');
  }
  
});

const createAttendance = asyncHandler(async (req, res) => {
  const { empId, name, date, clockIn, clockOut, status } = req.body;
  const dateOnly = new Date(date);
  const yyyyMmDd = dateOnly.toISOString().split("T")[0];
  const newAttendance = new Attendance({
    empId,
    name,
    date: yyyyMmDd,
    clockIn,
    clockOut,
    status,
  });
  const attendence = await newAttendance.save();

  if (attendence) {
    res.status(200).json({ message: "Attendance Marked" });
  } else {
    res.status(400);
    throw new Error("Error in Attendace Marking");
  }
});

const updateClockOut = async (req, res) => {
  try {
    const { empId, clockOut } = req.body;

    if (!empId || !clockOut) {
      return res
        .status(400)
        .json({ message: "empId, date, and clockOut are required" });
    }
    const now = new Date(); // e.g., 2025-05-24T16:49:29.885Z

    // Convert to start of the day in UTC
    const startOfDayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    const start = new Date(startOfDayUTC);
    const end = new Date(startOfDayUTC);

    end.setUTCDate(end.getUTCDate() + 1); // Add one day safely in UTC
    const updatedAttendance = await Attendance.findOneAndUpdate(
      {
        empId,
        date: {
          $gte: start,
          $lt: end,
        },
      },
      { $set: { clockOut } },
      { new: true } // Return the updated document
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({
      message: "Clock-out time updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    console.error("Error updating clockOut:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createClockIn = asyncHandler(async (req, res) => {
  const { empId, name, clockIn, status } = req.body;
  // const now = new Date();
  const dateOnly = new Date();
  const yyyyMmDd = dateOnly.toISOString().split("T")[0];
  console.log(yyyyMmDd);
  const newAttendance = new Attendance({
    empId,
    name,
    date: yyyyMmDd,
    clockIn,
    clockOut: "",
    status,
  });
  const attendence = await newAttendance.save();

  if (attendence) {
    res.status(200).json({ message: "Attendance Marked" });
  } else {
    res.status(400);
    throw new Error("Error in Attendace Marking");
  }
});
const declareHoliday = asyncHandler(async (req, res) => {
  const {  date } = req.body;
  const dt = new Date(date);
  const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const month = monthNames[dt.getMonth()];
const year = dt.getFullYear();
 const employees = await Employee.find({isActive: true}, 'empId name'); // Get all employee IDs
  const bulkOps = employees.map(emp => ({
    updateOne: {
      filter: { empId: emp.empId, date: date },
      update: { $set: { 
        name:emp.name,
        date: date,
        clockIn:null,
        clockOut:null,
        status: 'Holiday',
        month:month,
        year:year
       } },
      upsert: true // Insert if doesn't exist
    }
  }));
  await Attendance.bulkWrite(bulkOps);
  res.json("Holiday Declared");
});
const getmonthAttences = asyncHandler(async (req, res) => {
  console.log("Controller Working");
  const year = req.query.year;
  // console.log(year);
  const month = req.query.month;
  const attendences = await Attendance.find({  year,month });
  if (attendences) {
    res.json(attendences);
  } else {
    res.status(404);
    throw new Error("attendences is  not found");
  }
});

const convertYearFieldToNumber = async (req, res) => {
  try {
    const result = await Attendance.updateMany(
      { year: { $type: 'string' } },
      [
        {
          $set: {
            year: {
              $toInt: "$year"
            }
          }
        }
      ]
    );

    res.status(200).json({
      message: `Updated ${result.modifiedCount} documents with numeric 'year'.`
    });
  } catch (error) {
    console.error('Error converting year field:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export {
  getAttendanceList,
  createAttendance,
  getTodayAttendences,
  createClockIn,
  updateClockOut,
  getMyAttendance,
  declareHoliday,
  getmonthAttences,
  convertYearFieldToNumber,
};
