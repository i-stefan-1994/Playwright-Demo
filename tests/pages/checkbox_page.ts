import { expect, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class CheckboxPage extends CommonActions{
    constructor(page: Page){
        super(page);
    }
    private locators = {
        checkboxPage : 'https://demoqa.com/checkbox',
        homeCheckbox: '.rct-checkbox'
    }

    async navigateToCheckboxPage(){
        await this.navigate(this.locators.checkboxPage);
    }

    async checkHomeFolder(){
        await this.page.check(this.locators.homeCheckbox);
    }

    async assertIsChecked(){
        await expect(this.isChecked(this.locators.homeCheckbox)).toBeTruthy;
    }
}