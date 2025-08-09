import React, { useState } from "react";
import { Container, Card, Table, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useGetMyAttencesQuery } from "../slices/attendanceApiSlice";

const MyAttendanceScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState(userInfo.empId);

  const { data: attendences } = useGetMyAttencesQuery(empId);
  const calculateDuration = (clockIn, clockOut) => {
    if (clockOut !== null) {
      const start = new Date(clockIn);
      const end = new Date(clockOut);

      const diffMs = end - start; // difference in milliseconds
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60)); // hours
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

      return `${diffHrs}h ${diffMins}m`;
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <h2 className="text-center mb-4">My Timesheet</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                Employee Today Timesheet
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>EMPLOEE ID</th>
                      <th>NAME</th>
                      <th>DATE</th>
                      <th>CLOCK IN</th>
                      <th>CLOCK OUT</th>
                      <th>WORK TIME</th>
                      <th>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendences?.map((attendence) => (
                      <tr key={attendence._id}>
                        <td>{attendence.empId}</td>
                        <td>{attendence.name}</td>
                        <td>{attendence.date}</td>
                        <td>
                          {attendence.clockIn
                            ? new Date(attendence.clockIn).toLocaleTimeString()
                            : "Not clocked in"}
                        </td>
                        <td>
                          {attendence.clockOut
                            ? new Date(attendence.clockOut).toLocaleTimeString()
                            : "Not clocked Out"}
                        </td>
                        <td>
                          {calculateDuration(
                            attendence.clockIn,
                            attendence.clockOut
                          )}
                        </td>
                        <td>{attendence.status}</td>
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

export default MyAttendanceScreen;
