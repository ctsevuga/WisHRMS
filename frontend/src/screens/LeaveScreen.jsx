import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Row, Form } from "react-bootstrap";
import {
  useCreateLeaveMutation,
  useGetConfigQuery,
} from "../slices/leaveApiSlice";

const LeaveScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState();
  const [name, setName] = useState();
  const [year, setYear] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [config, setConfig] = useState();
  const [supervisorEmail, setSupervisorEmail] = useState();
  const [status, setStatus] = useState("Pending");
  const [createLeave] = useCreateLeaveMutation();
  // const [getConfig] = useGetConfigQuery();

  const shouldSkip = !empId || !year;
  const { data, error, isLoading } = useGetConfigQuery(
    { empId, year },
    {
      skip: shouldSkip,
    }
  );
  useEffect(() => {
    if (data) {
      setConfig(data); // Use your setter here
      // setSupervisorEmail(config.supervisorEmail)
    }
  }, [data]);
  useEffect(() => {
    if (config) {
      setSupervisorEmail(config.supervisorEmail);
      // setSupervisorEmail(config.supervisorEmail)
    }
  }, [config]);

  useEffect(() => {
    setEmpId(userInfo.empId);
    setName(userInfo.name);
  }, [userInfo]);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);
  // const { data: config } = useGetConfigQuery(empId,year);
  // console.log(config);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createLeave({
        year,
        empId,
        name,
        startDate,
        endDate,
        reason,
        status,
        supervisorEmail,
      }).unwrap();
      setStartDate("");
      setEndDate("");
      setReason("");
      toast.success("Leave Submitted ");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <Row>
          <h2 className="mb-4">
            Available Leave Days: {config?.availableLeaveDays} Days
          </h2>
        </Row>
        <h2 className="mb-4">Leave Application</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <Form.Group className="my-2" controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Submit Leave
          </button>
        </form>
      </div>
    </>
  );
};

export default LeaveScreen;
