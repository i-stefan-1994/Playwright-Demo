import { Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class ElementsPage extends CommonActions {
    private locators = {
        URL: 'https://demoqa.com/elements',
        username: '#userName',
        email: '#userEmail',
        currentAddress: '#currentAddress',
        permanentAddress: '#permanentAddress',
        submit: '#submit'
    }

    constructor(public readonly page: Page) {
        super(page);
    }

    async navigateToElementsPage() {
        await this.page.goto(this.locators.URL);
        await this.page.waitForLoadState('networkidle');
    }

    async selectTextCategory() {
        await this.page.getByText('Text Box').click();
    }

    async fillUserName(name: string | undefined) {
        if (name) {
            await this.page.locator(this.locators.username).fill(name);
        }
    }

    async fillEmail(email: string | undefined) {
        if (email) {
            await this.page.locator(this.locators.email).fill(email);
        }
    }

    async fillCurrentAddress(currentAddress: string | undefined) {
        if (currentAddress) {
            await this.page.locator(this.locators.currentAddress).fill(currentAddress);
        }
    }

    async fillPermanentAddress(permanentAddress: string | undefined) {
        if (permanentAddress) {
            await this.page.locator(this.locators.permanentAddress).fill(permanentAddress);
        }
    }

    async clickSubmitButton() {
        await this.page.locator(this.locators.submit).click();
    }

    async fillTextbox({ name, email, currentAddress, permanentAddress }: { name?: string; email?: string; currentAddress?: string; permanentAddress?: string }) {
        await this.selectTextCategory();
        await this.fillUserName(name);
        await this.fillEmail(email);
        await this.fillCurrentAddress(currentAddress);
        await this.fillPermanentAddress(permanentAddress);
        await this.clickSubmitButton();
    }
}