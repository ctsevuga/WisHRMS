import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useUpdateClockOutMutation } from "../slices/attendanceApiSlice";

const UpdateClockOutScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState();
  const [clockOut, setClockOut] = useState("");

  const [updateClockOut, ] =
    useUpdateClockOutMutation();
  useEffect(() => {
    setEmpId(userInfo.empId);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateClockOut({
        empId,
        clockOut,
      }).unwrap();
      setClockOut("");
      toast.success("Clock Out created ");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Attendance</h2>
      <form onSubmit={submitHandler}>
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

        <button type="submit" className="btn btn-primary">
          Update ClockOut
        </button>
      </form>
    </div>
  );
};

export default UpdateClockOutScreen;
