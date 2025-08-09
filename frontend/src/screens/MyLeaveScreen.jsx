// import React,  from "react";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
 useGetMyLeavesQuery,
 useDeleteLeaveMutation,
} from "../slices/leaveApiSlice";

import { toast } from "react-toastify";

import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";

const MyLeavecreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
      const [empId, setEmpId] = useState(userInfo.empId);
  const { data: leaves, refetch } = useGetMyLeavesQuery(empId);;
console.log(leaves);
  const [deleteLeave] = useDeleteLeaveMutation();
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');      // e.g. 12
  const month = String(date.getMonth() + 1).padStart(2, '0'); // e.g. 06
  const year = date.getFullYear();                           // e.g. 2025

  return `${day}/${month}/${year}`;
};
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteLeave(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <h2 className="text-center mb-4">Employee Leave List</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}></Col>
          <Col md={4}></Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                My Leave Details
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>START DATE</th>
                      <th>END DATE</th>
                      <th>No Of DAYS</th>
                      <th>REASON</th>
                      <th>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves?.map((leave) => (
                      <tr key={leave._id}>
                        <td>{formatDate(leave.startDate)}</td>
                        <td>{formatDate(leave.endDate)}</td>
                        <td>{leave.numberOfDays}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                        {leave?.status == "Pending" && (
                        <td>
                          <>
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteHandler(leave._id)}
                            >
                              <FaTrash style={{ color: "white" }} />
                            </Button>
                          </>
                        </td>
                               )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyLeavecreen;
