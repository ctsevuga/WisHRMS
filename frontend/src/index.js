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
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ForgotScreen from './screens/ForgotScreen';
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
import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path='/forgot' element={<ForgotScreen />} />
      <Route path="/employee" element={<EmployeeScreen />} />

      {/* Dashboard Screen Path */}

      <Route path="/search/:keyword" element={<DashboardScreen />} />
      <Route path="/page/:pageNumber" element={<DashboardScreen />} />
      <Route path="/dashboard/:pageNumber" element={<DashboardScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<DashboardScreen />}
      />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/attendance" element={<AttendanceScreen />} />
        <Route path="/clockin" element={<CreateClockInScreen />} />
        <Route path="/clockout" element={<UpdateClockOutScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/leave" element={<LeaveScreen />} />
        <Route path="/employee/:empId" element={<EmployeeScreen />} />
        <Route path="/mine" element={<MyAttendanceScreen />} />
        <Route path="/salary" element={<SalaryDetailsScreen />} />
        <Route path="/payslips" element={<PayslipsScreen />} />
        <Route path="/leave/mine" element={<MyLeaveScreen />} />
        <Route
          path="/payroll/:id/view"
          element={<PayslipScreen />}
        />
        
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/today" element={<TodayScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/dashboard" element={<DashboardScreen />} />
        <Route path="/admin/leavelist" element={<LeaveListScreen />} />
        <Route path="/admin/configurations" element={<ConfigurationsScreen />} />
        <Route path="/admin/employees" element={<EmployeeListScreen />} />
        <Route path="/admin/salaries" element={<SalaryScreen />} />
        <Route path="/admin/salarylist" element={<SalaryListScreen />} />
        <Route path="/admin/payrolllist" element={<PayrollListScreen />} />
        <Route
          path="/admin/employee/:empId/view"
          element={<EmployeeViewScreen />}
        />
        <Route path="/admin/holiday" element={<HolidayScreen />} />
        <Route path="/admin/allocate" element={<AllocateLeavesScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/payment" element={<PayrollPaymentScreen />} />
        <Route path="/admin/payroll/:id/edit" element={<PayrollEditScreen />} />
        <Route path="/admin/salary/:id/edit" element={<SalaryEditScreen />} />
        <Route
          path="/admin/salary/:id/view"
          element={<SalaryViewScreen />}
        />
        <Route
          path="/admin/leave/:id/status"
          element={<LeaveStatusScreen />}
        />
      </Route>
       <Route
          path="/admin/payroll/:id/generate"
          element={<PayrollScreen />}
        />
      <Route path="/admin/payroll" element={<PayrollGenerationScreen />} />
      <Route path="" element={<dataInfoRoute />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/search/:keyword" element={<DashboardScreen />} />
        <Route path="/page/:pageNumber" element={<DashboardScreen />} />
        <Route path="/dashboard/:pageNumber" element={<DashboardScreen />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<DashboardScreen />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
