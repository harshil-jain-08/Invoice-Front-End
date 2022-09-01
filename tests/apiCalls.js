import {
  itemsAfterCreateNewItem,
  itemsBeforeCreateNewItem,
  itemToAdd,
} from "./itemMockData";

export const itemsGetBeforeCreateNewItem = (page) =>
  page.route("http://localhost:8081/Home/items", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemsBeforeCreateNewItem),
    });
    console.log("aa");
  });

export const itemsPostSuccess = (page) =>
  page.route("http://localhost:8081/Home/item", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemToAdd),
    });
  });

export const itemsPostFailure = (page) =>
  page.route("http://localhost:8081/Home/item", (route) => {
    route.fulfill({
      status: 400,
      body: JSON.stringify("error"),
    });
  });

export const itemsGetAfterCreateNewItem = (page) =>
  page.route("http://localhost:8081/Home/items", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemsAfterCreateNewItem),
    });
  });
