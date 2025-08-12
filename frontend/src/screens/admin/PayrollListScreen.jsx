import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeletePayrollMutation,
  useGetPayrollsQuery,
} from '../../slices/payrollApiSlice';
import { toast } from 'react-toastify';

const PayrollListScreen = () => {
  const { data: payrolls, refetch, isLoading, error } = useGetPayrollsQuery();
  const [deletePayroll] = useDeletePayrollMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePayroll(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <h1>Employee Payroll List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Month</th>
              <th>Net Pay</th>
              <th>Employer PF</th>
              <th>Generated On</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id}>
                <td>{payroll.empId}</td>
                <td>{payroll.name}</td>
                <td>{payroll.year}</td>
                <td>{payroll.month}</td>
                <td>₹{payroll.netPay?.toFixed(2)}</td>
                <td>₹{payroll.PFEmployerContribution?.toFixed(2) || '0.00'}</td>
                <td>{formatDate(payroll.generatedOn)}</td>
                <td>{formatDate(payroll.paymentDate)}</td>
                <td>
                  <LinkContainer
                    to={`/admin/payroll/${payroll._id}/edit`}
                    style={{ marginRight: '10px' }}
                  >
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(payroll._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PayrollListScreen;
