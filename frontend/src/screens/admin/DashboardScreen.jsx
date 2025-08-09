import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Paginate from "../../components/Paginate";
import {
  useGetAttencesQuery,
  useDeleteAttendanceMutation,
} from "../../slices/attendanceApiSlice";
import SearchBox from "../../components/SearchBox";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  Form,
} from "react-bootstrap";

const DashboardScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  // Date range states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

 const queryParams = {
  keyword: keyword || "",
  pageNumber: pageNumber || 1,
  startDate: startDate || undefined,
  endDate: endDate || undefined,
};

const { data, isLoading, refetch } = useGetAttencesQuery(queryParams);


  const [groupedByName, setGroupedByName] = useState([]);
  const [attendences, setAttendences] = useState([]);

  useEffect(() => {
    if (data) {
      setAttendences(data.attendences);
    }
  }, [data]);
  // console.log(attendences);
  const calculateDuration = (clockIn, clockOut) => {
    if (clockOut !== null) {
      const start = new Date(clockIn);
      const end = new Date(clockOut);
      const diffMs = end - start;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHrs}h ${diffMins}m`;
    }
  };

  const updatedAttendences = data?.attendences.map((att) => ({
    ...att,
    workTime: calculateDuration(att.clockIn, att.clockOut),
  }));

  function parseWorkTimeToMinutes(timeStr) {
    const hourMatch = timeStr?.match(/(\d+)h/);
    const minMatch = timeStr?.match(/(\d+)m/);
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minMatch ? parseInt(minMatch[1]) : 0;
    return hours * 60 + minutes;
  }

  useEffect(() => {
    if (updatedAttendences) {
      setGroupedByName(
        updatedAttendences.reduce((acc, { name, workTime }) => {
          const minutes = parseWorkTimeToMinutes(workTime);
          if (!acc[name]) {
            acc[name] = { name, totalMinutes: 0, count: 0 };
          }
          acc[name].totalMinutes += minutes;
          acc[name].count += 1;
          return acc;
        }, {})
      );
    }
  }, [updatedAttendences]);

  function formatMinutesToTime(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }

  const result = Object.values(groupedByName).map(
    ({ name, totalMinutes, count }) => ({
      name,
      totalWorkTime: formatMinutesToTime(totalMinutes),
      averageWorkTime: formatMinutesToTime(Math.round(totalMinutes / count)),
    })
  );

  const [deleteAttendance] = useDeleteAttendanceMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteAttendance(id);
        // refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Apply Filter button updates query params
  const filterHandler = (e) => {
    e.preventDefault();
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  return (
    <>
      <Container className="mt-4">
        <SearchBox />

        {/* Date Range Filter */}
        <Form onSubmit={filterHandler} className="mb-3">
          <Row>
            <Col md={3}>
              <Form.Control
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary">
                Apply Filter
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="secondary"
                onClick={() => {
                  setTempStartDate("");
                  setTempEndDate("");
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col>
            <h2 className="text-center mb-4">Employee Work Dashboard</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                Employee Details
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>EMPLOYEE ID</th>
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
                    {updatedAttendences?.map((attendence) => (
                      <tr key={attendence._id}>
                        <td>{attendence.empId}</td>
                        <td>{attendence.name}</td>
                        <td>
                          {new Date(attendence.date).toLocaleDateString()}
                        </td>
                        <td>
                          {attendence.clockIn
                            ? new Date(attendence.clockIn).toLocaleTimeString()
                            : "Not clocked in"}
                        </td>
                        <td>
                          {attendence.clockOut
                            ? new Date(attendence.clockOut).toLocaleTimeString()
                            : "Not clocked out"}
                        </td>
                        <td>
                          {calculateDuration(
                            attendence.clockIn,
                            attendence.clockOut
                          )}
                        </td>
                        <td>{attendence.status}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(attendence._id)}
                          >
                            <FaTrash style={{ color: "white" }} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Paginate
                  pages={data?.pages}
                  page={data?.page}
                  keyword={keyword ? keyword : ""}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardScreen;
