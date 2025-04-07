import { expect, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class CheckboxPage extends CommonActions{
    constructor(page: Page){
        super(page);
    }
    private locators = {
        checkboxPage : 'https://demoqa.com/checkbox',
        homeCheckboxVisual: 'label[for="tree-node-home"] .rct-checkbox', //this is the visual input for the checkbox
        homeCheckbox: '#tree-node-home', //this is the real input class
        folderSubfolderTextLocators: '.rct-text',
        extendAndCollapseBar : '.rct-collapse'
    }

    async navigateToCheckboxPage(){
        await this.navigate(this.locators.checkboxPage);
    }

    async checkHomeFolder(){
        await this.page.locator(this.locators.homeCheckboxVisual).click();
    }

    async assertIsChecked(){
        const isChecked = await this.isChecked(this.locators.homeCheckbox);
        expect(isChecked).toBeTruthy();
    }

    async assertIsNotChecked(){
        const isChecked = await this.isChecked(this.locators.homeCheckbox);
        expect(isChecked).toBeFalsy();
    }

    async extendAndCollapseFolderTreeByText(name: string){
        await this.page.locator(this.locators.folderSubfolderTextLocators, {hasText: name}).locator(this.locators.extendAndCollapseBar).click();
    }
}