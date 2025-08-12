import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetParametersQuery, useDeleteParameterMutation } from "../../slices/parameterApiSlice";
import { toast } from "react-toastify";

const ParameterListScreen = () => {
  const { data: parameters, refetch, isLoading, error } = useGetParametersQuery();
  const [deleteParameter] = useDeleteParameterMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this parameter?")) {
      try {
        await deleteParameter(id).unwrap();
        toast.success("Parameter deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete parameter");
      }
    }
  };

  return (
    <>
      <h1>Parameter List</h1>
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
              <th>HRA (%)</th>
              <th>Other Allowances (%)</th>
              <th>PF (Employee %)</th>
              <th>PF (Employer %)</th>
              <th>ESI (%)</th>
              <th>Tax (%)</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr key={param._id}>
                <td>{param.HRA}%</td>
                <td>{param.OtherAllowances}%</td>
                <td>{param.PFEmployeeContribution}%</td>
                <td>{param.PFEmployerContribution}%</td>
                <td>{param.ESI}%</td>
                <td>{param.Tax}%</td>
                <td>{new Date(param.createdAt).toLocaleDateString("en-GB")}</td>
                <td>
                  <LinkContainer to={`/admin/parameters/${param._id}/edit`}>
                    <Button variant="light" className="btn-sm me-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(param._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
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

export default ParameterListScreen;
