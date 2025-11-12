import React from "react";
import {
  Table,
  Spinner,
  Alert,
  Container,
  Button,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  useGetInactiveProductsQuery,
  useDeleteProductMutation,
} from "../slices/productApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaArrowLeft,
  FaTags,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";

const InactiveProductListScreen = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInactiveProductsQuery();

  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductMutation();

  // 🗑️ Delete handler
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        await refetch(); // Refresh list
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err);
        alert(err?.data?.message || "Failed to delete product");
      }
    }
  };

  return (
    <Container className="mt-5">
      {/* Header Section */}
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <Link to="/input">
            <Button variant="outline-primary" size="md">
              <FaArrowLeft className="me-2" />
              Go Back
            </Button>
          </Link>
        </Col>
        <Col className="text-center">
          <h3 className="text-danger fw-bold">Inactive Product List</h3>
        </Col>
      </Row>

      {/* Content Section */}
      {isLoading || isDeleting ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : isError ? (
        <Alert variant="danger" className="text-center">
          {error?.data?.message || "Failed to load inactive products"}
        </Alert>
      ) : products?.length === 0 ? (
        <Alert variant="info" className="text-center">
          No inactive products found.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center align-middle"
          >
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((prod, index) => (
                <tr key={prod._id}>
                  <td>{index + 1}</td>
                  <td>
                    <FaTags className="me-2 text-info" />
                    {prod.product || prod.Product}
                  </td>
                  <td>
                    <Badge bg="warning" text="dark" className="p-2 fs-6">
                      <FaMoneyBillWave className="me-1" />
                      ₹{prod.price ?? prod.Price}
                    </Badge>
                  </td>
                  <td>{new Date(prod.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* 👁 View Button */}
                    <LinkContainer to={`/product/${prod._id}`}>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                      >
                        <FaEye />
                      </Button>
                    </LinkContainer>

                    {/* ✏️ Edit Button */}
                    <LinkContainer to={`/product/${prod._id}/edit`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    {/* 🗑️ Delete Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(prod._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default InactiveProductListScreen;
