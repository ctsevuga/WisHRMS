import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaInfo } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteSalaryMutation,
  useGetSalariesQuery,
} from "../../slices/salaryApiSlice";
import { toast } from "react-toastify";

const SalaryListScreen = () => {
  const { data: salaries, refetch, isLoading, error } = useGetSalariesQuery();

  const [deleteSalary] = useDeleteSalaryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteSalary(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Employee Salary List</h1>
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
              <th>Employee ID</th>
              <th>Name</th>
              <th>Basic</th>
              <th>Gross Salary</th>
              <th>Net Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {salaries?.map((salary) => (
              <tr key={salary._id}>
                <td>{salary.empId}</td>
                <td>{salary.name}</td>
                <td>{salary.basic}</td>
                {/* <td>{salary.hra}</td>
                <td>{salary.conveyance}</td>
                <td>{salary.otherAllowances}</td>
                  <td>{salary.pf}</td>
                <td>{salary.esi}</td>
                <td>{salary.tax}</td> */}
                <td>{salary.grossSalary}</td>
                <td>{salary.netSalary}</td>

                <td>
                  <>
                    <LinkContainer
                      to={`/admin/salary/${salary._id}/view`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="light" className="btn-sm">
                        <FaInfo />
                      </Button>
                    </LinkContainer>
                    <LinkContainer
                      to={`/admin/salary/${salary._id}/edit`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(salary._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                    <LinkContainer
                      to={`/admin/payroll/${salary._id}/generate`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="light" className="btn-sm">
                        Generate
                      </Button>
                    </LinkContainer>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default SalaryListScreen;
