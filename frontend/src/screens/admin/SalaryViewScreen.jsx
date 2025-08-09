import Salary from '../../components/Salary';

import {
  Row,
  Col,
 
} from "react-bootstrap";

import { useGetSalaryDetailsQuery } from "../../slices/salaryApiSlice";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import { useParams } from 'react-router-dom';

const SalaryViewScreen = () => {
  const { id: salaryId } = useParams(); 
  
    const {
    data: salary,
    isLoading,
    error,
    refetch,
  } = useGetSalaryDetailsQuery(salaryId);

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
          <h1>Salary Details for {salary.name}</h1>
          <Row>
            
              <Col key={salary._id}>
                <Salary salary={salary} />
              </Col>
            
          </Row>
         
        </>
      )}
    </>
  );
};

export default SalaryViewScreen;
