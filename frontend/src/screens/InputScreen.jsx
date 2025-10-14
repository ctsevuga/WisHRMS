import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useCreateInputMutation } from "../slices/inputApiSlice";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaTrashAlt, FaPlus, FaFire, FaTools } from "react-icons/fa";
import { GiFurnace } from "react-icons/gi";
import { BsFillCalendarDateFill } from "react-icons/bs";

const InputScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState(null);

  const { data: productList } = useGetProductsQuery();
  const [createInput] = useCreateInputMutation();

  useEffect(() => {
    if (userInfo?._id) {
      setInput({
        createdBy: userInfo._id,
        heatNo: "",
        date: "",
        details: "",
        materials: [{ Product: "", qtyInKg: 0 }],
        workersSalary: 0,
        middleManagementSalary: 0,
        topManagementSalary: 0,
        gasCost: 0,
        waterCost: 0,
        electricityCost: 0,
        foodCost: 0,
        fuelForkLiftCost: 0,
        maintenanceCost: 0,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (productList) {
      setProducts(productList);
    }
  }, [productList]);

  const handleInputChange = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...input.materials];
    newMaterials[index][field] =
      field === "qtyInKg" ? parseFloat(value) || 0 : value;
    setInput({ ...input, materials: newMaterials });
  };

  const addMaterial = () => {
    setInput({
      ...input,
      materials: [...input.materials, { Product: "", qtyInKg: 0 }],
    });
  };

  const removeMaterial = (index) => {
    const newMaterials = [...input.materials];
    newMaterials.splice(index, 1);
    setInput({ ...input, materials: newMaterials });
  };

  const isDuplicateMaterial = (materials, currentIndex) => {
    const current = materials[currentIndex]?.Product;
    return current && materials.filter((m) => m.Product === current).length > 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const hasDuplicate = input.materials.some((_, idx) =>
      isDuplicateMaterial(input.materials, idx)
    );
    if (hasDuplicate) {
      toast.error("Duplicate products found in material list.");
      return;
    }

    try {
      const cleanedInput = {
        ...input,
        materials: input.materials.map(({ Product, qtyInKg }) => ({
          Product,
          qtyInKg,
        })),
      };

      await createInput(cleanedInput).unwrap();
      setInput({
        createdBy: userInfo._id,
        heatNo: "",
        date: "",
        details: "",
        materials: [{ Product: "", qtyInKg: 0 }],
        workersSalary: 0,
        middleManagementSalary: 0,
        topManagementSalary: 0,
        gasCost: 0,
        waterCost: 0,
        electricityCost: 0,
        foodCost: 0,
        fuelForkLiftCost: 0,
        maintenanceCost: 0,
      });
      toast.success("Input created successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (!input) return null;

  return (
    <Container fluid className="py-4">
      <h3 className="text-center mb-4 text-primary fw-bold">
        <GiFurnace className="me-2 text-danger" /> Create Furnace Production Input
      </h3>
      <Form onSubmit={handleSubmit}>
        <Card className="shadow-sm mb-4 border-0">
          <Card.Header className="bg-dark text-white">
            <h5 className="mb-0"><FaTools className="me-2" /> Input Details</h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label><FaFire className="me-2 text-danger" /> Heat No</Form.Label>
                  <Form.Control
                    type="text"
                    value={input.heatNo}
                    onChange={(e) => handleInputChange("heatNo", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label><BsFillCalendarDateFill className="me-2 text-info" /> Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={input.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={input.details}
                    onChange={(e) => handleInputChange("details", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />
            <h5 className="text-secondary fw-bold">Materials</h5>

            {input.materials.map((mat, index) => {
              const isDuplicate = isDuplicateMaterial(input.materials, index);
              return (
                <Row
                  key={index}
                  className="bg-light rounded p-3 mb-3 align-items-end g-3"
                >
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Product</Form.Label>
                      <Form.Select
                        className={isDuplicate ? "is-invalid" : ""}
                        value={mat.Product}
                        onChange={(e) =>
                          handleMaterialChange(index, "Product", e.target.value)
                        }
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.Product} (RM {product.Price}/kg)
                          </option>
                        ))}
                      </Form.Select>
                      {isDuplicate && (
                        <div className="invalid-feedback">
                          Duplicate product selected.
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={8} md={4}>
                    <Form.Group>
                      <Form.Label>Quantity (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        value={mat.qtyInKg}
                        onChange={(e) =>
                          handleMaterialChange(index, "qtyInKg", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={2} className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeMaterial(index)}
                      disabled={input.materials.length === 1}
                    >
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              );
            })}

            <Button
              variant="outline-success"
              size="sm"
              onClick={addMaterial}
              className="mb-3"
            >
              <FaPlus className="me-2" /> Add Material
            </Button>

            <hr className="my-4" />
            <h5 className="text-secondary fw-bold">Cost Inputs</h5>
            <Row className="g-3">
              {[
                "workersSalary",
                "middleManagementSalary",
                "topManagementSalary",
                "gasCost",
                "waterCost",
                "electricityCost",
                "foodCost",
                "fuelForkLiftCost",
                "maintenanceCost",
              ].map((field) => (
                <Col key={field} xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>
                      {field.replace(/([A-Z])/g, " $1")}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={input[field]}
                      onChange={(e) =>
                        handleInputChange(field, parseFloat(e.target.value) || 0)
                      }
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
        <div className="text-center">
          <Button type="submit" variant="primary" size="lg">
            Submit Input
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default InputScreen;
