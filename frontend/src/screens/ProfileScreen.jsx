import { useState } from "react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useGetEmployeeQuery } from "../slices/employeesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState(userInfo.empId);

  const { data: employee, isLoading, error } = useGetEmployeeQuery(empId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <LinkContainer to={`/employee`} style={{ marginRight: "10px" }}>
          <Button variant="primary my-small-btn mb-3">
            Profile Create/Edit
          </Button>
        </LinkContainer>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={employee.name} description={employee.address} />

          <Card>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>
                      Employee ID: <span className="strong text-warning"></span>{" "}
                      {employee?.empId}
                    </h5>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>
                      Employee Name:{" "}
                      <span className="strong text-warning">
                        {employee?.name}
                      </span>
                    </h5>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Gender: {employee?.gender}</ListGroup.Item>
                  <ListGroup.Item>
                    Date Of Birth: {employee?.dob}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Joining Date: {employee?.joiningDate}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Department: {employee.department}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Designation: {employee.designation}
                  </ListGroup.Item>
                  <ListGroup.Item>Contact: {employee.contact}</ListGroup.Item>
                  <ListGroup.Item>Address: {employee.address}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col md={12}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h6 className=" text-center">
                      Account Number:{employee.accountNumber}
                    </h6>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h6 className=" text-center">
                      IFSC Code : {employee.ifscCode}
                    </h6>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h6 className=" text-center">
                      Bank Name:{employee.bankName}
                    </h6>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
