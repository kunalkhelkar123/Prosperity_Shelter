/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductListPage from "./pages/ProductListPage";
import AdminDashboard from "./pages/Dashboard";

import Navbar from "./components/NavBar";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  const Layout = ({ children }) => (
    <>
      <Navbar />
      {children}
    </>
  );
  const AdminLayout = ({ children }) => (
    <>
      <AdminNavbar />
      {children}
    </>
  );

  return (
    <Router>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                {" "}
                <RegisterPage />
              </Layout>
            }
          />
          <Route
            path="/create-product"
            element={
              <AdminLayout>
                {" "}
                <CreateProductPage />
              </AdminLayout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                {" "}
                <ProductListPage />{" "}
              </Layout>
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
