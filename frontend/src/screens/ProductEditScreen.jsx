import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "react-bootstrap";
import { FaTag, FaDollarSign, FaArrowLeft, FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
  useGetProductByIdQuery,
  useUpdateProductPriceMutation,
} from "../slices/productApiSlice"; // Adjust path as needed

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductByIdQuery(id);

  const [updateProductPrice, { isLoading: isUpdating }] =
    useUpdateProductPriceMutation();

  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (product) {
      setPrice(product.price ?? product.Price);
      setIsActive(product.isActive);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (price === "" || isNaN(price) || Number(price) < 0) {
      setFormError("Please enter a valid non-negative price.");
      return;
    }

    try {
      await updateProductPrice({ id, price: Number(price), isActive }).unwrap();
      await refetch();
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => navigate("/productList"), 1500);
    } catch (err) {
      setFormError(err?.data?.message || "Failed to update product.");
    }
  };

  // Toggle the active status and immediately update in DB
  const handleToggleActive = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    try {
      await updateProductPrice({ id, price: Number(price), isActive: newStatus }).unwrap();
      await refetch();
      setSuccessMessage(
        `Product has been ${newStatus ? "activated" : "deactivated"}.`
      );
    } catch (err) {
      setFormError(err?.data?.message || "Failed to update active status.");
      setIsActive(!newStatus); // revert UI change if error
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
                  onClick={() => navigate("/productList")}
                >
                  <FaArrowLeft className="me-1" /> Back
                </Button>
                <h3 className="mb-0 text-primary">Edit Product</h3>
              </div>

              {isLoading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : isError ? (
                <Alert variant="danger">
                  {error?.data?.message || "Failed to load product."}
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
                        step="any"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border-warning"
                        min="0"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4 d-flex align-items-center justify-content-between">
                    <Form.Label className="mb-0">
                      {isActive ? (
                        <FaToggleOn
                          className="text-success me-2"
                          size={24}
                        />
                      ) : (
                        <FaToggleOff className="text-danger me-2" size={24} />
                      )}
                      Active Status
                    </Form.Label>
                    <Button
                      variant={isActive ? "success" : "secondary"}
                      onClick={handleToggleActive}
                      disabled={isUpdating}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </Button>
                  </Form.Group>

                  {formError && <Alert variant="danger">{formError}</Alert>}
                  {successMessage && (
                    <Alert variant="success">{successMessage}</Alert>
                  )}

                  <div className="d-grid mt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Spinner animation="border" size="sm" /> Updating...
                        </>
                      ) : (
                        "Update Product"
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
