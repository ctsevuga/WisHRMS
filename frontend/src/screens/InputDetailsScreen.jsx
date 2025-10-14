import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInputQuery } from "../slices/inputApiSlice";

const InputDetailsScreen = () => {
  const { id } = useParams();
  const [input, setInput] = useState(null);

  const {
    data: fetchedInput,
    refetch,
    isLoading,
    error,
  } = useGetInputQuery(id);

  useEffect(() => {
    if (fetchedInput) {
      setInput(fetchedInput);
    }
  }, [fetchedInput]);

  if (error) return <div className="alert alert-danger mt-4">{error.message}</div>;
  if (!input) return <div className="alert alert-warning mt-4">No input found.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Input Details</h2>

      <div className="card mb-4 shadow">
        <div className="card-body">
          <h5 className="card-title">Heat No: {input.heatNo}</h5>
          <p className="card-text">
            <strong>Date:</strong> {new Date(input.date).toLocaleDateString()}<br />
            <strong>Created By:</strong> {input.createdBy?.name || "N/A"}<br />
            {input.details && (
              <>
                <strong>Details:</strong> {input.details}<br />
              </>
            )}
          </p>
        </div>
      </div>

      <h4>Materials</h4>
      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Qty (Kg)</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {input.materials.map((mat, index) => (
            <tr key={index}>
              <td>{mat.Product?.Product || "N/A"}</td>
              <td>{mat.qtyInKg}</td>
              <td>₹{mat.cost?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Summary</h4>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Total Material Cost:</strong> ₹{input.totalMaterialCost?.toFixed(2)}</li>
            <li className="list-group-item"><strong>Total Material (Kg):</strong> {input.totalMaterialInKg}</li>
            <li className="list-group-item"><strong>Cost per Kg:</strong> ₹{input.materialkgPerCost?.toFixed(2)}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Overall Cost:</strong> ₹{input.overallCost?.toFixed(2)}</li>
            <li className="list-group-item"><strong>Overall Cost per Kg:</strong> ₹{input.overallmaterialkgPerCost?.toFixed(2)}</li>
          </ul>
        </div>
      </div>

      <h4 className="mt-4">Other Costs</h4>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Workers' Salary:</strong> ₹{input.workersSalary}</li>
            <li className="list-group-item"><strong>Middle Management Salary:</strong> ₹{input.middleManagementSalary}</li>
            <li className="list-group-item"><strong>Top Management Salary:</strong> ₹{input.topManagementSalary}</li>
            <li className="list-group-item"><strong>Food Cost:</strong> ₹{input.foodCost}</li>
            <li className="list-group-item"><strong>Fuel (Forklift):</strong> ₹{input.fuelForkLiftCost}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Gas Cost:</strong> ₹{input.gasCost}</li>
            <li className="list-group-item"><strong>Water Cost:</strong> ₹{input.waterCost}</li>
            <li className="list-group-item"><strong>Electricity Cost:</strong> ₹{input.electricityCost}</li>
            <li className="list-group-item"><strong>Maintenance Cost:</strong> ₹{input.maintenanceCost}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputDetailsScreen;
