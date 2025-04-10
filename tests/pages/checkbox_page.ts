import CommonActions from "../utils/CommonActions";

import { expect, Locator, Page } from "playwright/test";
import { checkboxLocators, selectedFiles } from "../locators/checkbox-locators";

type folderNames =  'Home' |  'Desktop' | 'Documents' | 'DocumentsWorksSpace' | 'DocumentsOffice' | 'Downloads';
type visibilityOptions = 'visible' | 'notVisible'
type folderAndFileNames = folderNames;
const fileAndFolderLocators = {
    'Home': checkboxLocators.homeCheckbox,
    'Desktop': checkboxLocators.desktopCheckbox
}
const fileAndFolderVisualLocators = {
    'Home': checkboxLocators.homeCheckboxVisual,
    'Desktop': checkboxLocators.desktopCheckboxVisual
}

export class CheckboxPage extends CommonActions {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCheckboxPage():Promise<void> {
        await this.navigate(checkboxLocators.checkboxPage);
    }

    async checkFolderOrFile(file_or_folder_name: folderAndFileNames): Promise<void>{
        await this.page.locator(fileAndFolderVisualLocators[file_or_folder_name]).click();
    }

    async assertIsCheckedOrNot(file_or_folder_name: folderAndFileNames, is_checked: 'is checked' | 'is not checked'): Promise<void>{
        const isChecked = await this.isChecked(fileAndFolderLocators[file_or_folder_name])
        is_checked === 'is checked'? expect(isChecked).toBeTruthy : expect(isChecked).toBeFalsy();
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