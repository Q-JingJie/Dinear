import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.scss";

import HomePage from "./routes/HomePage";
import QueryRadius from "./routes/QueryRadius";
import UnknownRoute from "./routes/UnknownRoute";
import Listings from "./routes/Listings";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/queryRadius" element={<QueryRadius />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="*" element={<UnknownRoute />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
