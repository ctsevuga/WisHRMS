import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useCreateProductMutation } from '../slices/productApiSlice'; // Adjust path as needed

const ProductScreen = () => {
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
      console.log(response);
      setSuccessMessage(`Product "${response.Product}" created successfully!`);
      setProduct('');
      setPrice('');
    } catch (err) {
      setErrorMessage(err?.data?.message || 'Failed to create product.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Create New Product</h3>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="product">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Creating...
                </>
              ) : (
                'Create Product'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
