import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
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

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import InputScreen from "./screens/InputScreen";
import InputListScreen from "./screens/InputListScreen";
import InputDetailsScreen from "./screens/InputDetailsScreen";
import OutputScreen from "./screens/OutputScreen";
import OutputListScreen from "./screens/OutputListScreen";
import OutputDetailsScreen from "./screens/OutputDetailsScreen";
import ProductListScreen from "./screens/ProductListScreen";
import InactiveProductListScreen from "./screens/InactiveProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      


      

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
      <Route path="/product" element={<ProductScreen />} />
      <Route path="/productList" element={<ProductListScreen />} />
      <Route path="/inactiveProductList" element={<InactiveProductListScreen />} />
      <Route path='/product/:id/edit' element={<ProductEditScreen />} />
      <Route path="/input" element={<InputScreen />} />
      <Route path="/inputList" element={<InputListScreen />} />
      <Route path='/input/:id/detail' element={<InputDetailsScreen />} />
      <Route path="/output" element={<OutputScreen />} />
      <Route path="/outputList" element={<OutputListScreen />} />
      <Route path='/output/:id/detail' element={<OutputDetailsScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        
      </Route>
 
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        {/* <PayPalScriptProvider deferLoading={true}> */}
        <RouterProvider router={router} />
        {/* </PayPalScriptProvider> */}
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
