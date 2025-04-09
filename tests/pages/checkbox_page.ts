import { expect, Locator, Page } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export class CheckboxPage extends CommonActions {
    constructor(page: Page) {
        super(page);
    }
    private locators = {
        checkboxPage: 'https://demoqa.com/checkbox',
        homeCheckboxVisual: 'label[for="tree-node-home"] .rct-checkbox', //this is the visual input for the checkbox
        homeCheckbox: '#tree-node-home', //this is the real input class
        folderSubfolderTextLocators: '.rct-text',
        extendAndCollapseBar: '.rct-collapse',
        resultLocator: '[id="result"]'
    }

    private desktopFilesSelected = [
        'desktop',
        'notes',
        'commands',
    ]


    private workspaceDocumentsSelected = [
        'workspace',
        'react',
        'angular',
        'veu',
    ]

    private officeDocumentsSelected = [
        'office',
        'public',
        'private',
        'classified',
        'general',
    ]

    private documentsFilesSelected = [
        ...this.workspaceDocumentsSelected,
        ...this.officeDocumentsSelected 
    ];

    private downloadsFilesSelected = [
        'downloads',
        'wordFile',
        'excelFile',
    ]

    private homeFilesSelected = [
        'home',
        ...this.desktopFilesSelected,
        ...this.documentsFilesSelected,
        ...this.downloadsFilesSelected
    ]

    private selectedFiles = {
        Desktop: this.desktopFilesSelected,
        DocumentsWorkspace: this.workspaceDocumentsSelected,
        DocumentsOffice: this.officeDocumentsSelected,
        Documents: this.documentsFilesSelected,
        Downloads: this.downloadsFilesSelected,
        Home: this.homeFilesSelected
    }

    async navigateToCheckboxPage():Promise<void> {
        await this.navigate(this.locators.checkboxPage);
    }

    async checkHomeFolder():Promise<void> {
        await this.page.locator(this.locators.homeCheckboxVisual).click();
    }

    async assertIsChecked():Promise<void> {
        const isChecked = await this.isChecked(this.locators.homeCheckbox);
        expect(isChecked).toBeTruthy();
    }

    async assertIsNotChecked():Promise<void> {
        const isChecked = await this.isChecked(this.locators.homeCheckbox);
        expect(isChecked).toBeFalsy();
    }

    async extendAndCollapseFolderTreeByText(name: string) {
        await this.page.locator(this.locators.folderSubfolderTextLocators, { hasText: name }).locator(this.locators.extendAndCollapseBar).click();
    }

    async getResults():Promise<Locator>{
        return this.page.locator(this.locators.resultLocator);
    }

    async checkSelectedFilesResultVisibility(subfolder_name: 'Home' |  'Desktop' | 'Documents' | 'DocumentsWorksSpace' | 'DocumentsOffice' | 'Downloads', option: 'visible' | 'not visible'):Promise<void>{
        const subfolderCategories = this.selectedFiles[subfolder_name]
        for(let selectedFile of subfolderCategories){
            option === 'visible' 
                ? await this.textIsVisible(selectedFile)
                : await this.textIsNotVisible(selectedFile);
        }
    }
}