import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

import {
  useGetParameterByIdQuery,
  useUpdateParameterMutation,
} from '../../slices/parameterApiSlice';

const ParameterEditScreen = () => {
  const { id: parameterId } = useParams();

  const [HRA, setHRA] = useState(0);
  const [OtherAllowances, setOtherAllowances] = useState(0);
  const [PFEmployeeContribution, setPFEmployeeContribution] = useState(0);
  const [PFEmployerContribution, setPFEmployerContribution] = useState(0);
  const [ESI, setESI] = useState(0);
  const [Tax, setTax] = useState(0);

  const navigate = useNavigate();

  const {
    data: parameter,
    isLoading,
    error,
    refetch,
  } = useGetParameterByIdQuery(parameterId);

  const [updateParameter, { isLoading: loadingUpdate }] = useUpdateParameterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateParameter({
        parameterId,
        HRA,
        OtherAllowances,
        PFEmployeeContribution,
        PFEmployerContribution,
        ESI,
        Tax,
      }).unwrap();
      toast.success('Parameter updated successfully');
      refetch();
      navigate('/admin/parameterlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (parameter) {
      setHRA(parameter.HRA || 0);
      setOtherAllowances(parameter.OtherAllowances || 0);
      setPFEmployeeContribution(parameter.PFEmployeeContribution || 0);
      setPFEmployerContribution(parameter.PFEmployerContribution || 0);
      setESI(parameter.ESI || 0);
      setTax(parameter.Tax || 0);
    }
  }, [parameter]);

  return (
    <>
      <Link to='/admin/parameterlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Parameter</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='hra'>
              <Form.Label>HRA (%)</Form.Label>
              <Form.Control
                type='number'
                value={HRA}
                onChange={(e) => setHRA(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='otherAllowances'>
              <Form.Label>Other Allowances (%)</Form.Label>
              <Form.Control
                type='number'
                value={OtherAllowances}
                onChange={(e) => setOtherAllowances(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='pfEmployee'>
              <Form.Label>PF (Employee Contribution %)</Form.Label>
              <Form.Control
                type='number'
                value={PFEmployeeContribution}
                onChange={(e) => setPFEmployeeContribution(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='pfEmployer'>
              <Form.Label>PF (Employer Contribution %)</Form.Label>
              <Form.Control
                type='number'
                value={PFEmployerContribution}
                onChange={(e) => setPFEmployerContribution(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='esi'>
              <Form.Label>ESI (%)</Form.Label>
              <Form.Control
                type='number'
                value={ESI}
                onChange={(e) => setESI(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='tax'>
              <Form.Label>Tax (%)</Form.Label>
              <Form.Control
                type='number'
                value={Tax}
                onChange={(e) => setTax(Number(e.target.value))}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ParameterEditScreen;
