import Salary from '../../components/Salary';
import { Row, Col } from "react-bootstrap";
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
  } = useGetSalaryDetailsQuery(salaryId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="mb-4">Salary Details for {salary.name}</h1>
          <Row className="g-4">
            {/* <Col md={4}> */}
              <Salary salary={salary} />
            {/* </Col> */}
          </Row>
        </>
      )}
    </>
  );
};

export default SalaryViewScreen;
