const { test, expect } = require("@playwright/test");
const testData = require("../fixture/loginFixture.json");
import { LoginPage } from "../pageObjects/login.po.js";

test.describe.configure({ timeout:60000 });
test.describe("Goto Page and Login", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto("https://yourkoseli.com/");
    });
    test("Login", async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateToLogin();
        await login.login(testData.validUser.email, testData.validUser.password);
        await login.submit();
        await login.nextpassInput(testData.validUser.password);
        await login.nextlogButton();
        await login.search(testData.search.searchTerm);
        await login.selectProduct();
        await login.cakenamefill(testData.cake.cakes);
        await login.update();
        await login.addCart();
        await login.checkoutfn();
        await login.customerfill();
        await login.order();
        await page.goto("https://yourkoseli.com/");
        await page.pause();
    });
});