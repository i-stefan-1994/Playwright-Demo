import { expect, Locator, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

type OutputField =  'name' | 'email' | 'currentAddress' | 'permanentAddress';

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

    async navigateToElementsPage(): Promise<void> {
        await this.navigate(this.locators.URL);
    }

    async selectTextCategory(): Promise<void> {
        await this.page.getByText('Text Box').click();
    }

    async fillUserName(name: string | undefined): Promise<void> {
        if (name) {
            await this.page.locator(this.locators.username).fill(name);
        }
    }

    async fillEmail(email: string | undefined): Promise<void> {
        if (email) {
            await this.page.locator(this.locators.email).fill(email);
        }
    }

    async fillCurrentAddress(currentAddress: string | undefined): Promise<void> {
        if (currentAddress) {
            await this.page.locator(this.locators.currentAddress).fill(currentAddress);
        }
    }

    async fillPermanentAddress(permanentAddress: string | undefined): Promise<void> {
        if (permanentAddress) {
            await this.page.locator(this.locators.permanentAddress).fill(permanentAddress);
        }
    }

    async clickSubmitButton(): Promise<void> {
        await this.page.locator(this.locators.submit).click();
    }

    /**
     * 
     * @param name
     * @param email
     * @param currentAddress
     * @param permanentAddress
     */
    async fillTextbox({ name, email, currentAddress, permanentAddress }: { name?: string; email?: string; currentAddress?: string; permanentAddress?: string }): Promise<void> {
        await this.selectTextCategory();
        await this.fillUserName(name);
        await this.fillEmail(email);
        await this.fillCurrentAddress(currentAddress);
        await this.fillPermanentAddress(permanentAddress);
        await this.clickSubmitButton();
    }

    async getOutput(): Promise<Locator>{
        return this.page.locator(this.locators.output);
    }


    async getOutputField(field: OutputField): Promise<Locator>{
        const output = await this.getOutput();
        return output.locator(this.locators[`output_${field}`])
    }

    /**
     * @param field - 'name', 'email', 'currentAddress', 'permanentAddress'
     */
    async expectFieldToBeMissing(field: OutputField): Promise<void>{
        const locator = await this.getOutputField(field);
        await expect(locator).toHaveCount(0);
    }

    async expectWrongEmailFormatError(): Promise<void>{
        await expect(this.page.locator(this.locators.email)).toHaveClass(this.locators.emailFormatError);
    }

    /**
     * @param field - 'name', 'email', 'currentAddres', 'permanentAddress'
     * @param expectedValue 
     */
    async expectOutputValue(field:OutputField, expectedValue: string): Promise<void>{
        const valueMap = {
            'name': this.locators.output_name,
            'email': this.locators.output_email,
            'currentAddress': this.locators.output_currentAddress,
            'permanentAddress': this.locators.output_permanentAddress
        }

        const rawText = await (await this.getOutput()).locator(valueMap[field]).textContent();
        const splitText = rawText?.split(':')[1].trim();
        expect(splitText).toBe(expectedValue);
    }
}