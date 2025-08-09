import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  useGetLeaveQuery,
  useLeaveStatusMutation,
} from "../../slices/leaveApiSlice";

import { useParams } from "react-router-dom";

const LeaveStatusScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [status, setStatus] = useState("Accepted");
  const [name, setName] = useState();

  const { data: leave } = useGetLeaveQuery(id);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0"); // e.g. 12
    const month = String(date.getMonth() + 1).padStart(2, "0"); // e.g. 06
    const year = date.getFullYear(); // e.g. 2025

    return `${day}/${month}/${year}`;
  };
  const [updateLeave] = useLeaveStatusMutation();
  useEffect(() => {
    setName(userInfo.name);
  }, [userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateLeave({ id, status, name });
      toast.success("Leave updated successfully");
      setStatus("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/admin/leavelist`}>Go Back</Link>

        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong>Employee ID: {leave?.empId}</strong>
          </Card.Title>
          <Card.Title as="div" className="product-title">
            <strong>Name: {leave?.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <p>START DATE: {formatDate(leave?.startDate)}</p>
            <p>END DATE: {formatDate(leave?.endDate)}</p>
            <p>No Of DAYS: {leave?.numberOfDays}</p>
            <p>REASON: {leave?.reason}</p>
            <p>STATUS: {leave?.status}</p>
            <p>By: {leave?.by}</p>
          </Card.Text>

          {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
        </Card.Body>
      </Card>
      {leave?.status == "Pending" && (
        <div className="container mt-4">
          <h2 className="mb-4">Update Leave Status</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Status
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LeaveStatusScreen;
