import CommonActions from "../utils/CommonActions";

import { expect, Locator, Page } from "playwright/test";
import { checkboxLocators } from "../locators/checkbox-tests/checkboxLocators";
import { selectedFiles } from "../locators/checkbox-tests/fileGroups";
import { fileAndFolderLocators, fileAndFolderVisualLocators } from "../locators/checkbox-tests/filesAndFoldersLocatorMaps";

type FolderNames = 'Home' | 'Desktop' | 'Documents' | 'DocumentsWorkspace' | 'DocumentsOffice' | 'Downloads';
type VisibilityOptions = 'visible' | 'notVisible'
type DesktopFileNames = 'DesktopNotes' | 'DesktopCommands';
type WorkspaceFileNames = 'React' | 'Angular' | 'Veu';
type OfficeFileNames = 'Public' | 'Private' | 'Classified' | 'General'
type FolderAndFileNames = FolderNames | DesktopFileNames | WorkspaceFileNames | OfficeFileNames

export class CheckboxPage extends CommonActions {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCheckboxPage(): Promise<void> {
        await this.navigate(checkboxLocators.checkboxPage);
    }

    async extendAndCollapseFolderTreeByText(name: string) {
        await this.page.locator(checkboxLocators.folderSubfolderTextLocators, { hasText: name }).locator(checkboxLocators.extendAndCollapseBar).click();
    }

    async getResults(): Promise<Locator> {
        return this.page.locator(checkboxLocators.resultLocator);
    }

    async checkFolderOrFile(file_or_folder_name: FolderAndFileNames): Promise<void> {
        await this.page.locator(fileAndFolderVisualLocators[file_or_folder_name]).click();
    }

    async assertIsCheckedOrNot(file_or_folder_name: FolderAndFileNames, is_checked: 'is checked' | 'is not checked'): Promise<void> {
        const checkedValue = await this.isChecked(fileAndFolderLocators[file_or_folder_name])
        expect(checkedValue).toBe(is_checked === 'is checked');
    }

    async checkIfVisibleOrNot(option: VisibilityOptions, locator: string): Promise<void> {
        option === 'visible'
            ? await this.textIsVisible(locator)
            : await this.textIsNotVisible(locator);
    }

    async checkSelectedFilesResultVisibility(subfolder_name: keyof typeof selectedFiles, option: VisibilityOptions): Promise<void> {
        const subfolderCategories = selectedFiles[subfolder_name]

        if (!subfolderCategories) {
            throw new Error(`No selected files found for: ${subfolder_name}`);
        }

        if (Array.isArray(subfolderCategories) && subfolderCategories.length > 1) {
            for (let selectedFile of subfolderCategories) {
                await this.checkIfVisibleOrNot(option, selectedFile);
            }
        } else if (typeof subfolderCategories === 'string') {
            await this.checkIfVisibleOrNot(option, subfolderCategories);
        } else {
            throw new Error('Type of argument is not supported')
        }
    }

    async checkDesktopFiles(file: keyof typeof selectedFiles): Promise<void> {
        await this.checkSelectedFilesResultVisibility(file, 'notVisible');
        await this.extendAndCollapseFolderTreeByText('Home');
        await this.extendAndCollapseFolderTreeByText('Desktop');
        await this.checkFolderOrFile(file);
        await this.assertIsCheckedOrNot(file, 'is checked');
        await this.checkSelectedFilesResultVisibility(file, 'visible');
    }

    async checkDocumentsSubfolders(file: keyof typeof selectedFiles): Promise<void> {
        await this.checkSelectedFilesResultVisibility(file, 'notVisible');
        await this.extendAndCollapseFolderTreeByText('Home');
        await this.extendAndCollapseFolderTreeByText('Documents');
        await this.checkFolderOrFile(file);
        await this.assertIsCheckedOrNot(file, 'is checked');
        await this.checkSelectedFilesResultVisibility(file, 'visible');
    }
}