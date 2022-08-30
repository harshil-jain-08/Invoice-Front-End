import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ from, children }) => {
  const { items, customers } = useContext(AppContext);
  if (from === "items" && items.length === 0) {
    return <Navigate to="/items" />;
  } else if (from === "customer" && customers.length === 0) {
    return <Navigate to="/customer" />;
  }
  return children;
};

export default ProtectedRoute;
