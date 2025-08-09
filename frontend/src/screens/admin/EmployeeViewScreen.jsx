import Employee from '../../components/Employee';

import {
  Row,
  Col,
 
} from "react-bootstrap";

import { useGetAdminEmployeesQuery } from "../../slices/employeesApiSlice";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import { useParams } from 'react-router-dom';

const EmployeeViewScreen = () => {
  const { empId} = useParams();  
  
  const {
    data: employees,
    isLoading,
    refetch,
    error,
  } = useGetAdminEmployeesQuery(Number(empId));

    return (
    <>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Employee Details</h1>
          <Row>
            {employees?.map((employee) => (
              <Col key={employee._id} sm={12} md={6} lg={6} xl={6}>
                <Employee employee={employee} />
              </Col>
            ))}
          </Row>
         
        </>
      )}
    </>
  );
};

export default EmployeeViewScreen;
