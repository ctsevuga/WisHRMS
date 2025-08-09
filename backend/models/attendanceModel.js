import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
     empId: {
      type: Number,
      
    },
    name: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
     required: true
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    status:    {
       type: String,
       required: true,
        default: 'Present',
        // enum: ['Present', 'Absent', 'Leave', 'Holiday'], default: 'Absent' 
      },
      month: {
      type: String,
      // required: true,
    },
    year: {
      type: Number,
      // required: true,
    },
  },
  
  {
    timestamps: true,
  }
);

// Pre-save hook to extract and store month name and year
attendanceSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isNew) {
    const dateObj = new Date(this.date);
    
    // Extract month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.month = monthNames[dateObj.getMonth()];  // 0-based index

    // Extract year
    this.year = dateObj.getFullYear();
  }

  next();
});
const Attendance = mongoose.model("Attendance", attendanceSchema);


export default Attendance;
