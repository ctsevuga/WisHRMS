import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ForgotScreen from "./screens/ForgotScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import CreateClockInScreen from "./screens/CreateClockInScreen";
import UpdateClockOutScreen from "./screens/UpdateClockOutScreen";
import AttendanceScreen from "./screens/AttendaceScreen";
import LeaveScreen from "./screens/LeaveScreen";
import MyAttendanceScreen from "./screens/MyAttendanceScreen";
import MyLeaveScreen from "./screens/MyLeaveScreen";
import SalaryDetailsScreen from "./screens/SalaryDetailsScreen";
import PayslipsScreen from "./screens/PayslipsScreen";
import PayslipScreen from "./screens/PayslipScreen";
import DashboardScreen from "./screens/admin/DashboardScreen";
import TodayScreen from "./screens/admin/TodayScreen";
import EmployeeListScreen from "./screens/admin/EmployeeListScreen";
import EmployeeViewScreen from "./screens/admin/EmployeeViewScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import HolidayScreen from "./screens/admin/HolidayScreen";
import AllocateLeavesScreen from "./screens/admin/AllocateLeavesScreen";
import LeaveListScreen from "./screens/admin/LeaveListScreen";
import ConfigurationsScreen from "./screens/admin/ConfigurationsScreen";
import LeaveStatusScreen from "./screens/admin/LeaveStatusScreen";
import SalaryScreen from "./screens/admin/SalaryScreen";
import SalaryListScreen from "./screens/admin/SalaryListScreen";
import SalaryEditScreen from "./screens/admin/SalaryEditScreen";
import SalaryViewScreen from "./screens/admin/SalaryViewScreen";
import PayrollScreen from "./screens/admin/PayrollScreen";
import PayrollGenerationScreen from "./screens/admin/PayrollGenerationScreen";
import PayrollListScreen from "./screens/admin/PayrollListScreen";
import PayrollEditScreen from "./screens/admin/PayrollEditScreen";
import PayrollPaymentScreen from "./screens/admin/PayrollPaymentScreen";
import ParameterListScreen from "./screens/admin/ParameterListScreen";
import ParameterEditScreen from "./screens/admin/ParameterEditScreen";
import store from "./store";


// Route wrapper component to use Redux state
const RouterWrapper = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route index path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgot" element={<ForgotScreen />} />

        {/* Both Roles Routes */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <AttendanceScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clockin"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <CreateClockInScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clockout"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <UpdateClockOutScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <LeaveScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/:empId"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <EmployeeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mine"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <MyAttendanceScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salary"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <SalaryDetailsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payslips"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <PayslipsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave/mine"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <MyLeaveScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll/:id/view"
          element={
            <ProtectedRoute
              user={userInfo}
              allowedRoles={["employee", "admin"]}
            >
              <PayslipScreen />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/today"
          element={
            <AdminRoute user={userInfo}>
              <TodayScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/userlist"
          element={
            <AdminRoute user={userInfo}>
              <UserListScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payroll"
          element={
            <AdminRoute user={userInfo}>
              <PayrollGenerationScreen />
            </AdminRoute>
          }
        />
<Route
          path="/admin/dashboard"
          element={
            <AdminRoute user={userInfo}>
              <PayrollGenerationScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/leavelist"
          element={
            <AdminRoute user={userInfo}>
              <LeaveListScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/configurations"
          element={
            <AdminRoute user={userInfo}>
              <ConfigurationsScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <AdminRoute user={userInfo}>
              <EmployeeListScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/salaries"
          element={
            <AdminRoute user={userInfo}>
              <SalaryScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/salarylist"
          element={
            <AdminRoute user={userInfo}>
              <SalaryListScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payrolllist"
          element={
            <AdminRoute user={userInfo}>
              <PayrollListScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/employee/:empId/view"
          element={
            <AdminRoute user={userInfo}>
              <EmployeeViewScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/holiday"
          element={
            <AdminRoute user={userInfo}>
              <HolidayScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/allocate"
          element={
            <AdminRoute user={userInfo}>
              <AllocateLeavesScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/user/:id/edit"
          element={
            <AdminRoute user={userInfo}>
              <UserEditScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payment"
          element={
            <AdminRoute user={userInfo}>
              <PayrollPaymentScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payroll/:id/edit"
          element={
            <AdminRoute user={userInfo}>
              <PayrollEditScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/salary/:id/edit"
          element={
            <AdminRoute user={userInfo}>
              <SalaryEditScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/salary/:id/view"
          element={
            <AdminRoute user={userInfo}>
              <SalaryViewScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/leave/:id/status"
          element={
            <AdminRoute user={userInfo}>
              <LeaveStatusScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payroll/:id/generate"
          element={
            <AdminRoute user={userInfo}>
              <PayrollScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute user={userInfo}>
              <DashboardScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <AdminRoute user={userInfo}>
              <DashboardScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/page/:pageNumber"
          element={
            <AdminRoute user={userInfo}>
              <DashboardScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/:pageNumber"
          element={
            <AdminRoute user={userInfo}>
              <DashboardScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/search/:keyword/page/:pageNumber"
          element={
            <AdminRoute user={userInfo}>
              <DashboardScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/parameterList"
          element={
            <AdminRoute user={userInfo}>
              <ParameterListScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/parameter/:id/edit"
          element={
            <AdminRoute user={userInfo}>
              <ParameterEditScreen />
            </AdminRoute>
          }
        />
        {/* Profile (optional - accessible by all roles) */}
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
