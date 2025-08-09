// import React,  from "react";

import { FaEdit } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import {
  useGetLeavesQuery,
  
} from "../../slices/leaveApiSlice";

import { toast } from "react-toastify";

import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";

const LeaveListScreen = () => {
  const { data: leaves, refetch } = useGetLeavesQuery({});

  
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');      // e.g. 12
  const month = String(date.getMonth() + 1).padStart(2, '0'); // e.g. 06
  const year = date.getFullYear();                           // e.g. 2025

  return `${day}/${month}/${year}`;
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
                Employee Leave Details
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>EMPLOEE ID</th>
                      <th>NAME</th>
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
                        <td>{leave.empId}</td>
                        <td>{leave.name}</td>
                        <td>{formatDate(leave.startDate)}</td>
                        <td>{formatDate(leave.endDate)}</td>
                        <td>{leave.numberOfDays}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                        <td>
                       <LinkContainer
                        to={`/admin/leave/${leave._id}/status`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      </td>
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

export default LeaveListScreen;
