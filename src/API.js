import axios from "axios";

const client = axios.create({
  baseURL: "https://metsys-invoice.netlify.app/Home",
});

export async function getItemsAPI() {
  const response = await client.get("/items").catch();
  return response.data;
}

export async function addItemAPI(item) {
  await client.post("/item", item).catch();
}

export async function getCustomersAPI() {
  const response = await client.get("/customers").catch();
  return response.data;
}

export async function addCustomerAPI(customer) {
  await client.post("/customer", customer).catch();
}

export async function EditItemAPI(item) {
  await client.patch(`/item/${item.id}`, item).catch(Error);
}

export async function EditCustomerAPI(customer) {
  await client.patch(`/customer/${customer.id}`, customer).catch(Error);
}

export async function getInvoicesAPI() {
  const response = await client.get("/invoices").catch();
  return response.data;
}

export async function addInvoiceAPI(invoice) {
  await client.post("/invoice", invoice).catch();
}

export async function EditInvoiceAPI(invoice) {
  await client.patch(`/invoice/${invoice.id}`, invoice).catch(Error);
}

export async function getInvoiceByIdAPI(id) {
  const response = await client.get(`/invoice/edit/${id}`).catch();
  return response.data;
}
