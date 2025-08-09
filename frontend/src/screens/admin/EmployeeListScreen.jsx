import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetEmployeesQuery } from "../../slices/employeesApiSlice";
import { toast } from "react-toastify";

const EmployeeListScreen = () => {
  const { data: employees, refetch, isLoading, error } = useGetEmployeesQuery();

  const formatDateToBritish = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' = British format DD/MM/YYYY
  };

  return (
    <>
      <h1>Employees</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Joining Date</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Account Number</th>
              <th>IFSC Code</th>
              <th>Bank Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.gender}</td>
                <td>{formatDateToBritish(employee.dob)}</td>
                {/* <td>{employee.joiningDate}</td> */}
                <td>{formatDateToBritish(employee.joiningDate)}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.contact}</td>
                <td>{employee.address}</td>
                <td>{employee.accountNumber}</td>
                <td>{employee.ifscCode}</td>
                <td>{employee.bankName}</td>
                <LinkContainer
                  to={`/admin/employee/${employee.empId}/view`}
                  style={{ marginRight: "10px" }}
                >
                  <Button variant="light" className="btn-sm">
                    <FaInfo />
                  </Button>
                </LinkContainer>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default EmployeeListScreen;
