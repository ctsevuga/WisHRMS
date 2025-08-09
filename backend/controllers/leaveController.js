import asyncHandler from "../middleware/asyncHandler.js";
import Leave from "../models/leaveModel.js";
import Configuration from "../models/configurationModel.js";
import moment from "moment";
import nodemailer from "nodemailer";


const getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({});
  res.json(leaves);
});

const getMyLeaves = asyncHandler(async (req, res) => {
  console.log(req.params.empId);
  const leaves = await Leave.find({ empId: req.params.empId });
  if (leaves) {
    res.json(leaves);
  } else {
    res.status(404);
    throw new Error("Leaves are  not found");
  }
});

const createLeave = asyncHandler(async (req, res) => {
  try {
    const { year, empId, name, startDate, endDate, reason, status } = req.body;
    const supervisorEmail = req.body.supervisorEmail;
    // Validate dates
    if (!startDate || !endDate || new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "Invalid date range" });
    }
    // Calculate number of leave days (inclusive)
    const numberOfDays = moment(endDate).diff(moment(startDate), "days") + 1;
    // Find configuration for this employee
    const config = await Configuration.findOne({ empId, year });
    if (!config) {
      return res
        .status(404)
        .json({ message: "Leave configuration not found for employee" });
    }
    // Check if enough leave days are available
    if (numberOfDays + 1 > config.availableLeaveDays) {
      return res
        .status(400)
        .json({ message: "Insufficient available leave days" });
    }

    const dateOnly = new Date(startDate);
    const yyyyMmDd = dateOnly.toISOString().split("T")[0];
    const dateOnly2 = new Date(endDate);
    const yyyyMmDd2 = dateOnly2.toISOString().split("T")[0];
    const newLeave = new Leave({
      empId,
      name,
      startDate: yyyyMmDd,
      endDate: yyyyMmDd2,
      reason,
      status,
      numberOfDays,
    });
    const leave = await newLeave.save();
    // Update the employee's available leave days
    config.availableLeaveDays -= numberOfDays;
    await config.save();
    config.daysLeaveTaken += numberOfDays;
    await config.save();
    // Setup Nodemailer transporter
   console.log(process.env.EMAIL_USER)
   console.log(process.env.EMAIL_PASSWORD)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "smtp.ethereal.email" for testing
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
       tls: {
    rejectUnauthorized: false // ❌ don't use this in production!
  }
    });

    const mailOptions = {
      from: `HR System <${process.env.EMAIL_USER}>`,
      to: supervisorEmail,
      subject: "HR Notification",
      // text: 'Your message here.'
      html: `
        <p>Dear Supervisor,</p>
        <p>${name} has applied for leave.</p>
        <p><strong>Dates:</strong> ${startDate} to ${endDate}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Please log in to the system to approve or reject the request.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    if (leave) {
      res.status(200).json({ message: "Leave Submitted" });
    } else {
      res.status(400);
      throw new Error("Error in Leave Submission");
    }
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateLeaveStatus = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.body.id);
  console.log(leave);
  if (leave) {
    leave.status = req.body.status;
    await leave.save();
    leave.by = req.body.name;
    await leave.save();
    if (leave.status == "Rejected") {
      const empId = updatedLeave.empId;
      const year = new Date(updatedLeave.startDate).getUTCFullYear();
      const config = await Configuration.findOne({ empId, year });
      config.availableLeaveDays += leave.numberOfDays;
      await config.save();
      config.daysLeaveTaken -= leave.numberOfDays;
      await config.save();
    }

    res.status(200).json({ message: "Leave Status Updated" });
  } else {
    res.status(404);
    throw new Error("Leave not found");
  }
});

const getLeaveById = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (leave) {
    res.json(leave);
  } else {
    res.status(404);
    throw new Error("Leave not found");
  }
});

const deleteLeave = asyncHandler(async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    console.log(leave);
    const empId = leave.empId;
    const year = new Date(leave.startDate).getUTCFullYear();
    const config = await Configuration.findOne({ empId, year });

    if (leave) {
      await Leave.deleteOne({ _id: leave._id });
      config.availableLeaveDays += leave.numberOfDays;
      await config.save();
      config.daysLeaveTaken -= leave.numberOfDays;
      await config.save();
      res.json({ message: "Leave removed" });
    } else {
      res.status(404);
      throw new Error("Leave not found");
    }
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(500).json({ message: "Server error" });
  }
});
const getmyLeaveConfig = asyncHandler(async (req, res) => {
  console.log("config Server");
  const year = req.query.year;
  console.log(year);
  const empId = Number(req.query.empId);
  const config = await Configuration.findOne({ empId, year });
  if (config) {
    res.json(config);
  } else {
    res.status(404);
    throw new Error("Leave Configuration is  not found");
  }
});
export {
  createLeave,
  getAllLeaves,
  getMyLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave,
  getmyLeaveConfig,
};
