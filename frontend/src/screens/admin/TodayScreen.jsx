

import { LinkContainer } from "react-router-bootstrap";



import {
  
  useGetTodayAttencesQuery,
} from "../../slices/attendanceApiSlice";


import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

const TodayScreen = () => {
  
  const { data:attendences, isLoading, error } = useGetTodayAttencesQuery();
console.log(attendences);

  // const { data:todayData } = useGetTodayAttencesQuery({
  //   keyword,
  //   pageNumber,
  // });
  
  
  
  
  
  const calculateDuration = (clockIn, clockOut) => {
    if (clockOut !== null) {
      const start = new Date(clockIn);
      const end = new Date(clockOut);

      const diffMs = end - start; // difference in milliseconds
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60)); // hours
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

      return `${diffHrs}h ${diffMins}m`;
    }
  };

  const updatedAttendences = attendences?.map((att) => ({
    ...att,
    workTime: calculateDuration(att.clockIn, att.clockOut),
  }));

  // const barChartData = {
  //   labels: updatedAttendences?.map((att) => att.name),
  //   datasets: [
  //     {
  //       label: "Work Hours",
  //       data: updatedAttendences?.map((att) => {
  //         // const [hours, minutes] = att.workTime?.split('h').map(str => parseInt(str.trim()));
  //         const [hours, minutes] = att.workTime
  //           ? att.workTime.split("h").map((str) => parseInt(str.trim()))
  //           : [0, 0]; // default values
  //         return hours + minutes / 60;
  //       }),
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  //   // setChartKey(0);
  // };

  // const lineChartData = {
  //   labels: updatedAttendences?.map((emp) => emp.name),
  //   datasets: [
  //     {
  //       label: "Work Hours",
  //       data: updatedAttendences?.map((att) => {
  //         // const [hours, minutes] = att.workTime?.split('h').map(str => parseInt(str.trim()));
  //         const [hours, minutes] = att.workTime
  //           ? att.workTime.split("h").map((str) => parseInt(str.trim()))
  //           : [0, 0]; // default values
  //         return hours + minutes / 60;
  //       }),
  //       fill: false,
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  // const pieChartData = {
  //   labels: ["Present", "Absent"],
  //   datasets: [
  //     {
  //       data: [
  //         updatedAttendences?.filter((att) => att.status === "Present").length,
  //         updatedAttendences?.filter((att) => att.status !== "Present").length,
  //       ],
  //       backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
  //     },
  //   ],
  // }

  

  

//    const todayHandler = async () => {
//    console.log(todayData);

// // const todayAttences = data.attendences.filter(item => {
// //   const itemDate = item.date.split('T')[0]; // Extract '2025-05-26' part
// //   return itemDate === today;
// // });
//   };

  return (
    <>
          <Row>
        <LinkContainer to={`/dashboard`} style={{ marginRight: "10px" }}>
          <Button variant="primary my-small-btn mb-3">Dashboard </Button>
        </LinkContainer>
      </Row>
      <Container className="mt-4">
        
        <Row>
          <Col>
            <h2 className="text-center mb-4">Today Timesheet</h2>
          </Col>
        </Row>
        {/* <Row>
          <Col md={4}>
            <Card>
              <Card.Header className="bg-primary text-white">
                Work Hours by Employee
              </Card.Header>
              <Card.Body>
                <Bar data={barChartData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header className="bg-success text-white">
                Work Hours Trend
              </Card.Header>
              <Card.Body>
                <Line data={lineChartData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header className="bg-warning text-white">
                Attendance Status
              </Card.Header>
              <Card.Body>
                <Pie data={pieChartData} />
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                Employee Today Timesheet
              </Card.Header>
              <Card.Body>
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
                    {updatedAttendences?.map((attendence) => (
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
                          {calculateDuration(
                            attendence.clockIn,
                            attendence.clockOut
                          )}
                        </td>
                        <td>{attendence.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
               
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodayScreen;
