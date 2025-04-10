import { test } from "../utils/fixtures";
import type { MyFixtures } from '../utils/fixtures';


test.describe("Checkbox tests", () => {

    let checkboxPage: ReturnType<MyFixtures['pom_manager']['getDemoQA_CheckboxPage']>;
    
    test.beforeEach(async ({ pom_manager, page }) => {
        checkboxPage = pom_manager.getDemoQA_CheckboxPage();
        await checkboxPage.navigateToCheckboxPage();
        checkboxPage.hasUrl(/checkbox/);
    });

    test('Checks the Home folder', async () => {
        await checkboxPage.assertIsCheckedOrNot('Home', 'is not checked');
        await checkboxPage.checkFolderOrFile('Home');
        await checkboxPage.assertIsCheckedOrNot('Home', 'is checked');
    });

    test('Extend home tree and assert visibility of subfolders', async() => {
        await checkboxPage.textIsNotVisible('Desktop', 'Documents', 'Downloads');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home');
        await checkboxPage.textIsVisible('Desktop', 'Documents', 'Downloads');
    });

    test('Collapse home tree and check that subfolders are not visible', async() => {
        await checkboxPage.textIsNotVisible('Desktop', 'Documents', 'Downloads');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home');
        await checkboxPage.textIsVisible('Desktop', 'Documents', 'Downloads');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home');
    });

    test('Check selected files visibility - Home', async () => {
        await checkboxPage.checkSelectedFilesResultVisibility('Home', 'notVisible');
        await checkboxPage.checkFolderOrFile('Home');
        await checkboxPage.checkSelectedFilesResultVisibility('Home', 'visible');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home')
        await checkboxPage.extendAndCollapseFolderTreeByText('Downloads')
    });

    test('Check selected files visibility - Desktop', async() => {
        await checkboxPage.checkDesktopFiles('Desktop');
    });


    test('Check selected files for visibility - Desktop - Notes', async() => {
       await checkboxPage.checkDesktopFiles('DesktopNotes');
    });

    test('Check selected files for visibility - Desktop - Commands', async() => {
        await checkboxPage.checkDesktopFiles('DesktopCommands');
    });

    test('Check selected files for visibility - Documents', async() => {
        await checkboxPage.checkDocumentsSubfolders('Documents');
    });

    test('Check selected files for visibility - Documents Workspace', async() => {
        await checkboxPage.checkDocumentsSubfolders('DocumentsWorkspace');
    });

    test('Check selected files for visibility - Documents Office', async() => {
        await checkboxPage.checkDocumentsSubfolders('DocumentsOffice');
    });
});