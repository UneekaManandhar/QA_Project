const { expect } = require("@playwright/test");
const testData = require("../fixture/loginFixture.json");

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.phoneInput = page.locator('//*[@id="username"]');
        this.passwordInput = page.locator('//*[@id="password"]');
        this.loginButton = page.locator('//div[@class="wd-header-my-account wd-tools-element wd-event-hover wd-design-1 wd-account-style-text login-side-opener whb-vssfpylqqax9pvkfnxoz"]//a[@href="https://yourkoseli.com/my-account/" and contains(., "Login / Register")]');
        this.nextpasswordInput = page.locator('//*[@id="password"]');
        this.nextloginButton = page.locator('//*[@id="customer_login"]/div[1]/form/p[3]/button');
        this.submitloginButton = page.locator('//button[@name="login"]');
        this.searchInput = page.locator("//input[@type='text' and @name='s']").nth(0);
        this.productImage = page.locator("//div[contains(@class, 'wd-product')]//img[@alt='Friendship Day Cakes Nepal']")
        this.cakeName = page.locator('//*[@id="what_to_write_on_this_cake_"]');
        this.updateQty = page.locator('//*[@id="product-35636"]/div[1]/div[2]/div/div/div[2]/div/form/div[2]/input[3]');
        this.addtoCart = page.locator('//*[@id="product-35636"]/div[1]/div[2]/div/div/div[2]/div/form/button');
        this.checkout = page.locator("//a[@class='xoo-cp-btn-ch xcp-btn' and @href='https://yourkoseli.com/checkout/']");
        this.placeorder = page.locator('//*[@id="place_order"]');
// *[@id="place_order"]

        this.fullName = testData.contactDetail.fullname;
        this.senderPhone = testData.contactDetail.senderphone;
        this.senderEmail = testData.contactDetail.senderemail;
        this.deliveryLocation = testData.contactDetail.deliverylocation;
        this.receiverPhone1 = testData.contactDetail.receiverphone1;
        this.receiverPhone2 = testData.contactDetail.receiverphone2;

    } async navigateToLogin() {
        await this.loginButton.click()
        await this.page.waitForLoadState("domcontentloaded");
    }

    async submit() {
        await this.page.waitForTimeout(2000);
        await this.submitloginButton.click(); // Click the login button again if needed
        await this.page.waitForLoadState("domcontentloaded");
    }

    async nextpassInput(password){
        // await this.nextpasswordInput.click();
        await this.passwordInput.fill(password);
    }

    async nextlogButton(){
        await this.nextloginButton.click();
    }

    async login(phone, password) {
        await this.phoneInput.fill(phone);
        // await this.page.waitForTimeout(2000); // Add a delay
        await this.passwordInput.fill(password);
        // await this.page.waitForTimeout(3000); // Add a delay
    }

    async search(term){
        // await this.page.waitForTimeout(3000);
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState("domcontentloaded");
    }

    async selectProduct(){
        await this.productImage.waitFor({state:'visible',timeout:2000});
        await this.productImage.click();
    }

    async cakenamefill(cakename){
        await this.cakeName.fill(cakename);
    }

    async update(){
        await this.updateQty.click();
    }

    async addCart(){
        await this.page.waitForTimeout(1000);
        await this.addtoCart.click();
    }

    async checkoutfn(){
        await this.checkout.waitFor({state: 'visible' , timeout:3000});
        await this.checkout.click();
    }

    async order(){
        await this.page.waitForTimeout(1000);
        await this.placeorder.click();
    }

    async customerfill(){
        await this.page.locator('//*[@id="billing_first_name"]').fill(this.fullName);
        await this.page.locator('//*[@id="billing_phone"]').fill(this.senderPhone);
        await this.page.locator('//*[@id="billing_email"]').fill(this.senderEmail);
        await this.page.locator('//*[@id="shipping_address_1"]').fill(this.deliveryLocation);
        await this.page.locator('//*[@id="receiver_phone1"]').fill(this.receiverPhone1);
        await this.page.locator('//*[@id="contact_2"]').fill(this.receiverPhone2);
        // await this.page.locator('//*[@id="e_deliverydate"]').click();
    }
};
