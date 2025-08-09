// import React,  from "react";

// import { FaEdit } from "react-icons/fa";

import { useGetConfigurationsQuery } from "../../slices/configurationApiSlice";

import { Container, Row, Col, Card, Table } from "react-bootstrap";

const ConfigurationsScreen = () => {
  const { data: configurations, refetch } = useGetConfigurationsQuery({});

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}></Col>
          <Col md={4}></Col>
          <Col md={4}></Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                Configurations View
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>EMPLOEE ID</th>
                      <th>YEAR</th>
                      <th>TOTAL LEAVE DAYS</th>
                      <th>AVAILABLE LEAVE DAYS</th>
                      <th>DAYS LEAVE TAKEN</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {configurations?.map((configuration) => (
                      <tr key={configuration._id}>
                        <td>{configuration.empId}</td>
                        <td>{configuration.year}</td>

                        <td>{configuration.totalLeaveDays}</td>
                        <td>{configuration.availableLeaveDays}</td>
                        <td>{configuration.daysLeaveTaken}</td>
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

export default ConfigurationsScreen;
