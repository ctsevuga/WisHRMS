import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateClockInMutation } from "../slices/attendanceApiSlice";

const CreateClockInScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState();
  const [name, setName] = useState();

  const [clockIn, setClockIn] = useState("");

  const [status, setStatus] = useState("Present");
  const [createAttendace, { isLoading: loading }] = useCreateClockInMutation();
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

        clockIn,
        status,
      }).unwrap();
      setClockIn("");
      toast.success("Clock In created ");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Row>
        <LinkContainer to={`/clockout`} style={{ marginRight: "10px" }}>
          <Button variant="primary my-small-btn mb-3">Clock Out</Button>
        </LinkContainer>
      </Row>
      <div className="container mt-4">
        <h2 className="mb-4">Employee Attendance</h2>
        <form onSubmit={submitHandler}>
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
    </>
  );
};

export default CreateClockInScreen;
