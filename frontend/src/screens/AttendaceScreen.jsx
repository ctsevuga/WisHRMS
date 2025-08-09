import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { Form } from "react-bootstrap";
import { useCreateAttenceMutation } from "../slices/attendanceApiSlice";

const AttendanceScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState();
  const [name, setName] = useState();

  const [date, setDate] = useState("");
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [status, setStatus] = useState("Present");
  const [createAttendace] = useCreateAttenceMutation();
  useEffect(() => {
    setEmpId(userInfo.empId);
    setName(userInfo.name);
  }, [userInfo]);
  console.log(name);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createAttendace({
        empId,
        name,
        date,
        clockIn,
        clockOut,
        status,
      }).unwrap();
      setDate("");
      setClockIn("");
      setClockOut("");
      setStatus("");
      toast.success("Attendance created ");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Attendance</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Clock In</label>
          <input
            type="datetime-local"
            className="form-control"
            name="clockIn"
            value={clockIn}
            onChange={(e) => setClockIn(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Clock Out</label>
          <input
            type="datetime-local"
            className="form-control"
            name="clockOut"
            value={clockOut}
            onChange={(e) => setClockOut(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
            <option value="Holiday">Holiday</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceScreen;
