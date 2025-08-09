import React, { useState } from "react";

import { toast } from "react-toastify";

import { useAllocateLeavesMutation,useGetYearsQuery } from "../../slices/configurationApiSlice";

const AllocateLeavesScreen = () => {
  
  const [year, setYear] = useState();
  const [totalLeaveDays, setTotalLeaveDays] = useState();
  
  
  
 const [allocateLeaves, { isLoading: loadingUpdateProfile }] =
     useAllocateLeavesMutation();
   

 const { data: years, refetch, isLoading } = useGetYearsQuery();
 

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
       if (years.includes(year)) {
      toast.error('Leave for the Year already allocated');
    }else {
      const res = await allocateLeaves({
     year,
     totalLeaveDays
      }).unwrap();
      setTotalLeaveDays("");
      toast.success("Leaves Allocated ");
              
    } }catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leave Allocation</h2>
      <form onSubmit={submitHandler}>
       <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
               <div className="mb-3">
          <label className="form-label">Total Leave Days</label>
          <input
            type="number"
            className="form-control"
            name="totalLeaveDays"
            value={totalLeaveDays}
            onChange={(e) => setTotalLeaveDays(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Allocate Leaves
        </button>
      </form>

      {/* {response && (
        <div className="alert alert-success mt-4">
          Attendance record created successfully.
        </div>
      )} */}
    </div>
  );
};

export default AllocateLeavesScreen;
