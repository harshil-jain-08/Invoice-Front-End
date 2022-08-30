import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Views/Home";
import SharedContent from "./components/SharedContent";
import ViewItems from "./Views/Items/ViewItems";
import AddItems from "./Views/Items/AddItems";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ViewCustomer from "./Views/Customer/ViewCustomer";
import AddCustomer from "./Views/Customer/AddCustomer";
import EditItem from "./Views/Items/EditItem";
import ProtectedRoute from "./Utils/ProtectedRoute";
import EditCustomer from "./Views/Customer/EditCustomer";
import ViewInvoices from "./Views/Invoice/ViewInvoices";
import InvoiceForm from "./Views/Invoice/InvoiceForm";
import { InvoiceProvider } from "./context/InvoiceContext";

function App() {
  return (
    <AppProvider>
      <InvoiceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedContent />}>
              <Route index element={<Home />} />

              <Route path="customer" element={<Outlet />}>
                <Route index element={<ViewCustomer />} />
                <Route path="add" element={<AddCustomer />} />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRoute from="customer">
                      <EditCustomer />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="items" element={<Outlet />}>
                <Route index element={<ViewItems />} />
                <Route path="add" element={<AddItems />} />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRoute from="items">
                      <EditItem />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="invoice" element={<Outlet />}>
                <Route index element={<ViewInvoices />} />
                <Route path="add" element={<InvoiceForm />} />
              </Route>
            </Route>
            <Route path="*" element={<h1>Error</h1>} />
          </Routes>
        </BrowserRouter>
      </InvoiceProvider>
    </AppProvider>
  );
}

export default App;
