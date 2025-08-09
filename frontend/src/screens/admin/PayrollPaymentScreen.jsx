import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdatePayrollAllMutation } from "../../slices/payrollApiSlice";
import { useGetMonthsQuery } from "../../slices/monthApiSlice";

const PayrollPaymentScreen = () => {
  const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
  const [updatePayroll, { isLoading: loadingUpdate }] =
    useUpdatePayrollAllMutation();
    const { data: monthyears } = useGetMonthsQuery();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePayroll({ month, year });
      
      toast.success("Payment Date for All Employees Updated ");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
    useEffect(() => {
      if (monthyears && monthyears.length > 0) {
        const years = [...new Set(monthyears.map((item) => item.year))];
        const months = [...new Set(monthyears.map((item) => item.month))];
  
        setYears(years); // e.g., [2023, 2024]
        setMonths(months); // e.g., ["January", "February"]
        // console.log(years);
        // console.log(months);
      }
    }, [monthyears]);

  return (
    <>
      <Link to="/admin/payrolllist" className="btn btn-light my-3">
        Go Back
      </Link>
          <div className="container mt-4">
              <form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId="year">
                  <Form.Label>Select Year</Form.Label>
                  <Form.Control
                    as="select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">-- Select Year --</option>
                    {years?.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="name">
                  <Form.Label>Select Month</Form.Label>
                  <Form.Control
                    as="select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="">-- Select Month --</option>
                    {months?.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
      
                <button type="submit">Update Payment Date</button>
              </form>
            </div>


    </>
  );
};

export default PayrollPaymentScreen;
