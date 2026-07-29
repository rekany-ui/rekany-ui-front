import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound404 from "./components/NotFound404";
import HomePage from "./pages/Home/Home";
import ContactPage from "./pages/Contact/ContactPage";
import ProductsPage from "./pages/Products/Products";
import AboutPage from "./pages/About/AboutPage";
import LoginPage from "./pages/Admin/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/produits" element={<ProductsPage />} />
      </Route>

      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/backoffice" element={<AdminPage />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}