import { rest } from "msw";

const EmptyData = [];
const Data = [
  {
    created_at: 1660906993707,
    email: "asrf@fg.com",
    id: 1,
    name: "person a",
    phone: "9999888877",
    updated_at: 1660907169126,
  },
  {
    created_at: 1660906993707,
    email: "aaaa@fg.com",
    id: 2,
    name: "person b",
    phone: "9999888877",
    updated_at: 1660907169126,
  },
];
export const emptyData = rest.get(
  "http://localhost:8080/Home/customers",
  (req, res, ctx) => {
    return res(ctx.json(EmptyData));
  }
);
const filledData = rest.get(
  "http://localhost:8080/Home/customers",
  (req, res, ctx) => {
    return res(ctx.json(Data));
  }
);

const getData = rest.post(
  "http://localhost:8080/Home/customer",
  (req, res, ctx) => {
    const data = req.json();
    //console.log(data);
  }
);

export const handlers = [filledData, getData];
