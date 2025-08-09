import React, { useState } from "react";

import { toast } from "react-toastify";

import { useDeclareHolidayMutation } from "../../slices/attendanceApiSlice";

const HolidayScreen = () => {
  
  const [date, setDate] = useState("");
  
 const [declareHoliday, { isLoading: loadingUpdateProfile }] =
     useDeclareHolidayMutation();
 

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await declareHoliday({
     date,
      }).unwrap();
      setDate("");
      toast.success("Holiday Declared ");
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

        <button type="submit" className="btn btn-primary">
          Declare Holiday
        </button>
      </form>

      {/* {response && (
        <div className="alert alert-success mt-4">
          Attendance record created successfully.
        </div>
      )} */}
    </div>
  );
};

export default HolidayScreen;
