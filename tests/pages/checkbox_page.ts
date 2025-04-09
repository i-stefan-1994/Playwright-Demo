import CommonActions from "../utils/CommonActions";

import { expect, Locator, Page } from "playwright/test";
import { checkboxLocators, selectedFiles } from "../locators/checkbox-locators";

type folderNames =  'Home' |  'Desktop' | 'Documents' | 'DocumentsWorksSpace' | 'DocumentsOffice' | 'Downloads';
type visibilityOptions = 'visible' | 'notVisible'

export class CheckboxPage extends CommonActions {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCheckboxPage():Promise<void> {
        await this.navigate(checkboxLocators.checkboxPage);
    }

    async checkHomeFolder():Promise<void> {
        await this.page.locator(checkboxLocators.homeCheckboxVisual).click();
    }

    async assertIsChecked():Promise<void> {
        const isChecked = await this.isChecked(checkboxLocators.homeCheckbox);
        expect(isChecked).toBeTruthy();
    }

    async assertIsNotChecked():Promise<void> {
        const isChecked = await this.isChecked(checkboxLocators.homeCheckbox);
        expect(isChecked).toBeFalsy();
    }

    async extendAndCollapseFolderTreeByText(name: string) {
        await this.page.locator(checkboxLocators.folderSubfolderTextLocators, { hasText: name }).locator(checkboxLocators.extendAndCollapseBar).click();
    }

    async getResults():Promise<Locator>{
        return this.page.locator(checkboxLocators.resultLocator);
    }

    async checkSelectedFilesResultVisibility(subfolder_name: folderNames, option: visibilityOptions):Promise<void>{
        const subfolderCategories = selectedFiles[subfolder_name]
        for(let selectedFile of subfolderCategories){
            option === 'visible' 
                ? await this.textIsVisible(selectedFile)
                : await this.textIsNotVisible(selectedFile);
        }
    }
}