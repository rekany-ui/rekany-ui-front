// src/App.tsx

import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { queryClient } from "./config/queryClient";
import Layout from "./components/Layout";
import NotFound404 from "./components/NotFound404";
import HomePage from "./pages/Home/Home";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import ProductsPage from "./pages/Products/ProductsPage";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/produits" element={<ProductsPage />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </QueryClientProvider>
  );
}