import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetSalaryDetailsQuery,
  useUpdateSalaryMutation,
} from "../../slices/salaryApiSlice";

const SalaryEditScreen = () => {
  const { id: salaryId } = useParams();
  const [empId, setEmpId] = useState();
  const [name, setName] = useState("");
  const [basic, setBasic] = useState();
  const [hra, setHra] = useState();
  const [conveyance, setConveyance] = useState();
  const [otherAllowances, setOtherAllowances] = useState();
  const [pf, setPf] = useState();
  const [esi, setEsi] = useState();
  const [tax, setTax] = useState();
  const [effectiveFrom, setEffectiveFrom] = useState();
  const [effectiveTo, setEffectiveTo] = useState();

  const {
    data: salary,
    isLoading,
    error,
    refetch,
  } = useGetSalaryDetailsQuery(salaryId);

  const [updateSalary, { isLoading: loadingUpdate }] =
    useUpdateSalaryMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSalary({
        empId,
        basic,
        hra,
        conveyance,
        otherAllowances,
        pf,
        esi,
        tax,
        effectiveFrom,
        effectiveTo,
      });
      toast.success("salary updated successfully");
      refetch();
      navigate("/admin/salarylist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (salary) {
      setName(salary.name);
      setEmpId(salary.empId);
      setBasic(salary.basic);
      setHra(salary.hra);
      setConveyance(salary.conveyance);
      setOtherAllowances(salary.otherAllowances);
      setPf(salary.pf);
      setEsi(salary.esi);
      setTax(salary.tax);
      setEffectiveFrom(salary.effectiveFrom);
      setEffectiveTo(salary.effectiveTo);
    }
  }, [salary]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Salary for the Employee {name}</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="basic">
              <Form.Label>Basic</Form.Label>
              <Form.Control
                type="number"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="hra">
              <Form.Label>HRA</Form.Label>
              <Form.Control
                type="number"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="conveyance">
              <Form.Label>Conveyance</Form.Label>
              <Form.Control
                type="number"
                value={conveyance}
                onChange={(e) => setConveyance(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="otherAllowances">
              <Form.Label>Other Allowances</Form.Label>
              <Form.Control
                type="number"
                value={otherAllowances}
                onChange={(e) => setOtherAllowances(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pf">
              <Form.Label>PF</Form.Label>
              <Form.Control
                type="number"
                value={pf}
                onChange={(e) => setPf(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="esi">
              <Form.Label>ESI</Form.Label>
              <Form.Control
                type="number"
                value={esi}
                onChange={(e) => setEsi(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tax">
              <Form.Label>TAX</Form.Label>
              <Form.Control
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="effectiveFrom">
              <Form.Label>Effective From</Form.Label>
              <Form.Control
                type="date"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="effectiveTo">
              <Form.Label>Effective To</Form.Label>
              <Form.Control
                type="date"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SalaryEditScreen;
