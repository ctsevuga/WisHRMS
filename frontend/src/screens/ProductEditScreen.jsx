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
  Card,
  InputGroup,
} from 'react-bootstrap';
import { FaTag, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
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
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm rounded-4 border-0 p-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <Button
                  variant="outline-primary"
                  className="me-3"
                  onClick={() => navigate('/productList')}
                >
                  <FaArrowLeft className="me-1" /> Back
                </Button>
                <h3 className="mb-0 text-primary">Update Product Price</h3>
              </div>

              {isLoading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : isError ? (
                <Alert variant="danger">
                  {error?.data?.message || 'Failed to load product.'}
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaTag className="me-2 text-success" />
                      Product Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={product.product ?? product.Product}
                      disabled
                      className="border-success"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaDollarSign className="me-2 text-warning" />
                      Price
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>₹</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border-warning"
                        min="0"
                      />
                    </InputGroup>
                  </Form.Group>

                  {formError && <Alert variant="danger">{formError}</Alert>}
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}

                  <div className="d-grid mt-3">
                    <Button type="submit" variant="primary" size="lg" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Spinner animation="border" size="sm" /> Updating...
                        </>
                      ) : (
                        'Update Price'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .form-control:focus {
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }
      `}</style>
    </Container>
  );
};

export default ProductEditScreen;
