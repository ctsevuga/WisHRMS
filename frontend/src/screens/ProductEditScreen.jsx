import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import {
  useGetProductByIdQuery,
  useUpdateProductPriceMutation,
} from '../slices/productApiSlice'; // Adjust path as needed

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);
  const [updateProductPrice, { isLoading: isUpdating }] = useUpdateProductPriceMutation();

  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (product) {
      setPrice(product.price ?? product.Price); // Handle capital or lowercase
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (price === '' || isNaN(price) || Number(price) < 0) {
      setFormError('Please enter a valid non-negative price.');
      return;
    }

    try {
      await updateProductPrice({ id, price: Number(price) }).unwrap();
      setSuccessMessage('Product price updated successfully!');
      setTimeout(() => navigate('/productList'), 1500); // Redirect after short delay
    } catch (err) {
      setFormError(err?.data?.message || 'Failed to update product.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Update Product Price</h3>

          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : isError ? (
            <Alert variant="danger">
              {error?.data?.message || 'Failed to load product.'}
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={product.product ?? product.Product}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              {formError && <Alert variant="danger">{formError}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              <Button type="submit" variant="primary" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Spinner animation="border" size="sm" /> Updating...
                  </>
                ) : (
                  'Update Price'
                )}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductEditScreen;
