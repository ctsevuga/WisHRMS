import React, { useState } from "react";
import { FaInfoCircle, FaTrashAlt, FaSearch } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import {
  useGetInputsQuery,
  useDeleteInputMutation,
} from "../slices/inputApiSlice";
import { useGetProductsQuery } from "../slices/productApiSlice";
import {
  Spinner,
  Table,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Badge,
} from "react-bootstrap";

const InputListScreen = () => {
  const [filters, setFilters] = useState({ product: "" });

  const {
    data: inputs,
    isLoading,
    isError,
    refetch,
  } = useGetInputsQuery(filters);

  const {
    data: products,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductsQuery();

  const [deleteInput] = useDeleteInputMutation();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => refetch();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this input?")) {
      try {
        await deleteInput(id);
        toast.success("Input deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container py-4">
      <h3 className="text-center text-primary mb-4 fw-bold">
        🏭 Furnace Input List
      </h3>

      {(isError || isProductError) && (
        <Alert variant="danger">⚠️ Failed to load data.</Alert>
      )}

      {/* Filters */}
      <Form className="mb-4">
        <Row className="g-2 align-items-end">
          <Col xs={12} md={6} lg={4}>
            <Form.Group>
              <Form.Label>Filter by Product</Form.Label>
              <Form.Select
                name="product"
                value={filters.product}
                onChange={handleChange}
                disabled={isProductLoading}
              >
                <option value="">-- Select Product --</option>
                {products?.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.Product}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Button
              variant="primary"
              onClick={handleSearch}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <FaSearch className="me-2" />
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Table or Spinner */}
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {inputs?.length === 0 ? (
            <Alert variant="info" className="text-center">
              🔍 No inputs found. Try adjusting your filters.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover responsive className="align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Heat No</th>
                    <th>Date</th>
                    <th>Product(s)</th>
                    <th>Total Qty (Kg)</th>
                    <th>Total Cost (RM)</th>
                    <th>Cost/Kg</th>
                    <th>Overall Cost</th>
                    <th>Overall Cost/Kg</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {inputs?.map((input) => (
                    <tr key={input._id}>
                      <td>
                        <Badge bg="secondary" pill>
                          {input.heatNo}
                        </Badge>
                      </td>
                      <td>{new Date(input.date).toLocaleDateString()}</td>
                      <td>
                        {input.materials
                          .map((mat) => mat.Product?.Product || "N/A")
                          .join(", ")}
                      </td>
                      <td>
                        <span className="fw-bold text-primary">
                          {input.totalMaterialInKg?.toFixed(2)}
                        </span>
                      </td>
                      <td>RM {input.totalMaterialCost?.toFixed(2)}</td>
                      <td>RM {input.materialkgPerCost?.toFixed(2)}</td>
                      <td className="text-success fw-bold">
                        RM {input.overallCost?.toFixed(2)}
                      </td>
                      <td className="text-success">
                        RM {input.overallmaterialkgPerCost?.toFixed(2)}
                      </td>
                      <td className="d-flex justify-content-center gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteHandler(input._id)}
                          title="Delete"
                          aria-label="Delete Input"
                        >
                          <FaTrashAlt />
                        </Button>
                        <LinkContainer to={`/input/${input._id}/detail`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            title="View Details"
                            aria-label="View Details"
                          >
                            <FaInfoCircle />
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InputListScreen;
