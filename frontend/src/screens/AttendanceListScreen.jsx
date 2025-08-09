import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

import Paginate from "../components/Paginate";
import { useGetAttencesQuery } from "../slices/attendanceApiSlice";
import SearchBox from "../components/SearchBox";

const AttendanceListScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetAttencesQuery({
    keyword,
    pageNumber,
  });
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  // console.log(data.pages);
  useEffect(() => {
    if (data) {
      setPage(data.page);
      setPages(data.pages);
    }
  }, [page, pages]);
  const calculateDuration = (clockIn, clockOut) => {
    const start = new Date(clockIn);
    const end = new Date(clockOut);

    const diffMs = end - start; // difference in milliseconds
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60)); // hours
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

    return `${diffHrs}h ${diffMins}m`;
  };

  return (
    <>
      <SearchBox />
      <Row className="align-items-center">
        <Col>
          <h1>Time Sheets</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>EMPLOEE ID</th>
                <th>NAME</th>
                <th>DATE</th>
                <th>CLOCK IN</th>
                <th>CLOCK OUT</th>
                <th>WORK TIME</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.attendences.map((attendence) => (
                <tr key={attendence._id}>
                  <td>{attendence.empId}</td>
                  <td>{attendence.name}</td>
                  <td>{attendence.date}</td>
                  <td>
                    {attendence.clockIn
                      ? new Date(attendence.clockIn).toLocaleTimeString()
                      : "Not clocked in"}
                  </td>
                  <td>
                    {attendence.clockOut
                      ? new Date(attendence.clockOut).toLocaleTimeString()
                      : "Not clocked Out"}
                  </td>
                  <td>
                    {calculateDuration(attendence.clockIn, attendence.clockOut)}
                  </td>
                  <td>{attendence.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default AttendanceListScreen;
