import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../../context/AppContext";
import { InvoiceProvider } from "../../context/InvoiceContext";
import ViewCustomer from "./ViewCustomer";
import "@testing-library/jest-dom";
import AddCustomer from "./AddCustomer";
import { server } from "../../mocks/server";
import { emptyData, filledData, getData } from "../../mocks/handlers";
import userEvent from "@testing-library/user-event";

describe("tests", () => {
  server.use(emptyData);
  it("should show Empty customer list", () => {
    render(
      <AppProvider>
        <InvoiceProvider>
          <BrowserRouter>
            <ViewCustomer />
          </BrowserRouter>
        </InvoiceProvider>
      </AppProvider>
    );
    expect(screen.queryByRole("heading")).toHaveTextContent("Customers");
    expect(screen.getByText("No Entries")).toBeInTheDocument();
    const newCustomerButton = screen.getByRole("button");
    expect(newCustomerButton).toHaveTextContent(/^New Customer$/);
    //screen.getAllByRole("tt")
  });
  it("should show filled customer list", async () => {
    render(
      <AppProvider>
        <InvoiceProvider>
          <BrowserRouter>
            <ViewCustomer />
          </BrowserRouter>
        </InvoiceProvider>
      </AppProvider>
    );
    expect(screen.queryByRole("heading")).toHaveTextContent("Customers");
    expect(
      await (await screen.findByRole("textbox")).getAttribute("placeholder")
    ).toBe("Search");
    const newCustomerButton = screen.getByRole("button");
    expect(newCustomerButton).toHaveTextContent(/^New Customer$/);
    expect(screen.getAllByRole("row").length).toBeGreaterThanOrEqual(2);
  });
  it("should show Empty add Form", () => {
    render(
      <AppProvider>
        <InvoiceProvider>
          <BrowserRouter>
            <AddCustomer />
          </BrowserRouter>
        </InvoiceProvider>
      </AppProvider>
    );
    expect(screen.queryByRole("heading")).toHaveTextContent("New Customer");
    const newCustomerButton = screen.getByRole("button");
    expect(newCustomerButton).toHaveTextContent(/^Save Customer$/);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
    //screen.getAllByRole("tt")
  });
  it("should handle post request", async () => {
    render(
      <AppProvider>
        <InvoiceProvider>
          <BrowserRouter>
            <AddCustomer />
          </BrowserRouter>
        </InvoiceProvider>
      </AppProvider>
    );
    const [nameInput, emailInput, phoneInput] = screen
      .getAllByRole("textbox")
      .slice(-3);
    const userData = {
      name: "star",
      email: "star@gmail.com",
      phone: "9876543219",
    };
    const user = userEvent.setup();

    await user.type(nameInput, userData.name);
    expect(nameInput).toHaveValue(userData.name);
    await user.type(emailInput, userData.email);
    expect(emailInput).toHaveValue(userData.email);
    await user.type(phoneInput, userData.phone);
    expect(phoneInput).toHaveValue(userData.phone);
    fireEvent.click(screen.getByRole("button"));
  });
});
