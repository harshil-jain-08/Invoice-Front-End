// @ts-check
import { test, expect } from '@playwright/test';
import { itemsGetAfterCreateNewItem, itemsGetBeforeCreateNewItem, itemsPostSuccess } from './apiCalls';
import { itemsAfterCreateNewItem, itemsBeforeCreateNewItem, itemToAdd } from './itemMockData';


const URLaddress = "https://metsys-invoice.netlify.app"

test.describe("items test", () => {
  test("successful item post", async ({ page }) => {
    await itemsGetBeforeCreateNewItem(page);
    await page.goto(`${URLaddress}/items`);

    await page.locator("input").waitFor();
    expect(await page.locator("tr").count()).toEqual(
      itemsBeforeCreateNewItem.length + 1
    );

    await page.locator('button:has-text("New Item")').click();
    await page.fill('input[name="name"]', itemToAdd.name);
    await page.fill(
      'textarea[name="description"]',
      itemToAdd.description
    );
    await page.fill('input[name="price"]', itemToAdd.price.toString());
    await itemsPostSuccess(page);
    await itemsGetAfterCreateNewItem(page);
    await page.locator('button:has-text("Save Item")').click();

    await page.locator("tr").first().waitFor();
    expect(await page.locator("tr").count()).toEqual(
      itemsAfterCreateNewItem.length + 1
    );
  });
})
