import { expect, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class ElementsPage extends CommonActions {
    private locators = {
        URL: 'https://demoqa.com/elements',
        username: '#userName',
        email: '#userEmail',
        currentAddress: '#currentAddress',
        permanentAddress: '#permanentAddress',
        submit: '#submit',
        output: '#output',
        output_name: '#name',
        output_email: '#email',
        output_currentAddress: '#currentAddress',
        output_permanentAddress: '#permanentAddress',
        emailFormatError: /field-error/
    }

    constructor(public readonly page: Page) {
        super(page);
    }

    async navigateToElementsPage() {
        await this.page.goto(this.locators.URL, {waitUntil: 'domcontentloaded'});
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

    /**
     * 
     * @param name
     * @param email
     * @param currentAddress
     * @param permanentAddress
     */
    async fillTextbox({ name, email, currentAddress, permanentAddress }: { name?: string; email?: string; currentAddress?: string; permanentAddress?: string }) {
        await this.selectTextCategory();
        await this.fillUserName(name);
        await this.fillEmail(email);
        await this.fillCurrentAddress(currentAddress);
        await this.fillPermanentAddress(permanentAddress);
        await this.clickSubmitButton();
    }

    getOutput(){
        return this.page.locator(this.locators.output);
    }

    getOutputUsername(){
        return this.getOutput().locator(this.locators.output_name);
    }

    getOutputEmail(){
        return this.getOutput().locator(this.locators.output_email);
    }

    getOutputCurrentAddress(){
        return this.getOutput().locator(this.locators.output_currentAddress);
    }

    getOutputPermanentAddress(){
        return this.getOutput().locator(this.locators.output_permanentAddress);
    }

    async expectFieldToBeMissing(field: 'name' | 'email' | 'currentAddress' | 'permanentAddress'){
        const valueMap = {
            'name': this.getOutputUsername(),
            'email': this.getOutputEmail(),
            'currentAddress': this.getOutputCurrentAddress(),
            'permanentAddress': this.getOutputPermanentAddress()
        }
        await expect(valueMap[field]).toHaveCount(0);
    }

    async expectWrongEmailFormatError(){
        await expect(this.page.locator(this.locators.email)).toHaveClass(this.locators.emailFormatError);
    }

    /**
     * @param field - 'name', 'email', 'currentAddres', 'permanentAddress'
     * @param expectedValue 
     */
    async expectOutputValue(field: 'name' | 'email' | 'currentAddress' | 'permanentAddress', expectedValue: string){
        const valueMap = {
            'name': this.locators.output_name,
            'email': this.locators.output_email,
            'currentAddress': this.locators.output_currentAddress,
            'permanentAddress': this.locators.output_permanentAddress
        }

        const rawText = await this.getOutput().locator(valueMap[field]).textContent();
        const splitText = rawText?.split(':')[1].trim();
        expect(splitText).toBe(expectedValue);
    }
}