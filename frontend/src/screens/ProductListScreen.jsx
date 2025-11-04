import React from 'react';
import {
  Table,
  Spinner,
  Alert,
  Container,
  Button,
  Row,
  Col,
  Badge,
  Card,
} from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaPlus, FaTags, FaMoneyBillWave } from 'react-icons/fa';

const ProductListScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

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
          <h3 className="text-primary fw-bold">Product List</h3>
        </Col>
        <Col xs="auto" className="text-end">
          <Link to="/product">
            <Button variant="success" size="md">
              <FaPlus className="me-2" />
              Create Product
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Content Section */}
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : isError ? (
        <Alert variant="danger" className="text-center">
          {error?.data?.message || 'Failed to load products'}
        </Alert>
      ) : products?.length === 0 ? (
        <Alert variant="info" className="text-center">
          No products found. Please add some products.
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((prod, index) => (
                <tr
                  key={prod._id}
                  className="align-middle"
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <FaTags className="me-2 text-info" />
                    {prod.product || prod.Product}
                  </td>
                  <td>
                    <Badge
                      bg="warning"
                      text="dark"
                      className="p-2 fs-6"
                    >
                      <FaMoneyBillWave className="me-1" />
                      ₹{prod.price ?? prod.Price}
                    </Badge>
                  </td>
                  <td>{new Date(prod.createdAt).toLocaleDateString()}</td>
                  <td>
                    <LinkContainer to={`/product/${prod._id}/edit`}>
                      <Button variant="outline-primary" size="sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
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

export default ProductListScreen;
