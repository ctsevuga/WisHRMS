import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetSalaryDetailsQuery,
  useUpdateSalaryMutation,
} from "../../slices/salaryApiSlice";

const SalaryEditScreen = () => {
  const { id: salaryId } = useParams();
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [basic, setBasic] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");

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
        _id: salaryId,
        empId,
        basic,
        effectiveFrom,
        effectiveTo,
      }).unwrap();

      toast.success("Salary updated successfully");
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
      setEffectiveFrom(salary.effectiveFrom?.substring(0, 10));
      setEffectiveTo(salary.effectiveTo?.substring(0, 10));
    }
  }, [salary]);

  return (
    <>
      <Link to="/admin/salarylist" className="btn btn-light my-3">
        Go Back
      </Link>

      <Card className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Edit Salary for {name}</h2>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control type="text" value={name} readOnly plaintext />
                </Form.Group>

                <Form.Group controlId="basic" className="mb-3">
                  <Form.Label>Basic Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="effectiveFrom" className="mb-3">
                  <Form.Label>Effective From</Form.Label>
                  <Form.Control
                    type="date"
                    value={effectiveFrom}
                    onChange={(e) => setEffectiveFrom(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="empId" className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="text" value={empId} readOnly plaintext />
                </Form.Group>

                <Form.Group controlId="effectiveTo" className="mb-3">
                  <Form.Label>Effective To</Form.Label>
                  <Form.Control
                    type="date"
                    value={effectiveTo}
                    onChange={(e) => setEffectiveTo(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid mt-4">
                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Card>
    </>
  );
};

export default SalaryEditScreen;
