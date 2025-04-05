import { expect, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class ElementsPage extends CommonActions{
    private elementsPage_URL = 'https://demoqa.com/elements'
    private textBox_username_Locator = '#userName';
    private textBox_email_Locator = '#userEmail';
    private textBox_currentAddress_Locator = '#currentAddress';

    constructor(public readonly page: Page){
        super(page);
    }

    async navigateToElementsPage(){
        await this.page.goto(this.elementsPage_URL);
    }

    async selectTextCategory(){
        await this.page.getByText('Text Box').click();
    }

    async fillUserName(name: string){
        await this.page.locator(this.textBox_username_Locator).fill(name);
    }

    async fillEmail(email: string){
        await this.page.locator(this.textBox_email_Locator).fill(email);
    }

    async fillCurrentAddress(currentAddress: string){
        await this.page.locator(this.textBox_currentAddress_Locator).fill(currentAddress);
    }
}