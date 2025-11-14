import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { FaBox, FaMoneyBillWave, FaPlusCircle } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../slices/productApiSlice'; // Adjust path as needed

const ProductScreen = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Input validation
    if (!product.trim() || price === '') {
      setErrorMessage('Both product name and price are required.');
      return;
    }

    if (isNaN(price) || Number(price) < 0) {
      setErrorMessage('Please enter a valid price.');
      return;
    }

    try {
      const response = await createProduct({ product, price: Number(price) }).unwrap();
      setSuccessMessage(`Product "${response.Product || response.product}" created successfully!`);
      setProduct('');
      setPrice('');
      navigate("/productList");
    } catch (err) {
      setErrorMessage(err?.data?.message || 'Failed to create product.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm border-0 p-4">
            <h3 className="text-center text-primary mb-4">
              <FaPlusCircle className="me-2" />
              Create New Product
            </h3>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="product">
                <Form.Label>Product Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaBox />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price (₹)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="success" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Creating...
                    </>
                  ) : (
                    <>
                      <FaPlusCircle className="me-2" />
                      Create Product
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
