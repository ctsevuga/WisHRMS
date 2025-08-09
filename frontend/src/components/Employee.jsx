import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Employee = ({ employee }) => {
  const formatDateToBritish = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB'); // 'en-GB' = British format DD/MM/YYYY
  };
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/admin/employees`}>
        Go Back
      </Link>

      <Card.Body>
       
          <Card.Title as='div' className='product-title'>
            <strong>Employee ID: {employee.empId}</strong>
            </Card.Title>
            <Card.Title as='div' className='product-title'>
            <strong>Name: {employee.name}</strong>
          </Card.Title>
        

        <Card.Text as='div'>
          <p>Gender: {employee.gender}</p>
          <p>Date Of Birth: {formatDateToBritish(employee.dob)}</p>
          <p>Joining Date: {formatDateToBritish(employee.joiningDate)}</p>
          <p>Department: {employee.department}</p>
          <p>Designation: {employee.designation}</p>
          <p>Contact: {employee.contact}</p>
          <p>Address: {employee.address}</p>
          <p>Account Number: {employee.accountNumber}</p>
          <p>IFSC Code: {employee.ifscCode}</p>
          <p>Bank Name: {employee.bankName}</p>
          <p>Active: {employee.isActive.toString()}</p>
        </Card.Text>

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Employee;
