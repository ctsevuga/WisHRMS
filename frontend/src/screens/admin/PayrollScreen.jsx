import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Row, Form } from "react-bootstrap";
import { useGetMonthsQuery } from "../../slices/monthApiSlice";
import { useGeneratePayrollMutation } from "../../slices/payrollApiSlice";


const PayrollScreen = () => {
  const { id: salaryId } = useParams();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  // const [totalWorkingDays, setTotalWorkingeDays] = useState();
  const [generatePay, { isLoading }] = useGeneratePayrollMutation();

  const { data: monthyears } = useGetMonthsQuery();
  
  // console.log(salaryId)
  const handleSubmit= async (e) => {
    e.preventDefault();
    // const selected = monthyears.find(
    //   (item) => item.year === parseInt(year) && item.month === month
    // );
    // setTotalWorkingeDays(selected.totalWorkingDays);
    
        try {
          const res = await generatePay({  salaryId, month, year }).unwrap();
          
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

          <button type="submit">Generate Pay</button>
        </form>
      </div>
    </>
  );
};

export default PayrollScreen;
