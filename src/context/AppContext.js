import React, { createContext, useState } from "react";

const initialState = {
  customers: [],
  items: [],
  invoices: [],
}

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setItems = (items) => {
    setState({
      ...state,
      items: items,
    })
  }

  const setCustomers = (customers) => {
    setState({
      ...state,
      customers: customers,
    })
  }
  const setInvoices = (invoices) => {
    setState({
      ...state,
      invoices: invoices,
    })
  }

  return (
    <AppContext.Provider
      value={{
        customers: state.customers,
        items: state.items,
        invoices: state.invoices,
        setItems,
        setCustomers,
        setInvoices,
      }}>
      {props.children}
    </AppContext.Provider >
  );
};