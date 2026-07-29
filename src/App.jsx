import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { queryClient } from "./config/queryClient";
import Layout from "./components/Layout";
import NotFound404 from "./components/NotFound404";
import LoginPage from "./pages/Admin/pages/LoginPage";
import AdminPage from "./pages/Admin/pages/AdminPage";
import RegisterPage from "./pages/Admin/pages/RegisterPage";


const HomePage = lazy(() => import("./pages/Home/Home"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ProductsPage = lazy(() => import("./pages/Products/ProductsPage"));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
        <div className="spinner mx-auto" />
      </div>}>
        <Routes>
          {/* Routes avec Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/produits" element={<ProductsPage />} />
          </Route>

          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/backoffice" element={<AdminPage />} />

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}