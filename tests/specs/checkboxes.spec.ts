import { test } from "../utils/fixtures";

let checkboxPage;

test.describe("Checkbox tests", () => {
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
        await checkboxPage.extendAndCollapseFolderTreeByText('Home')
        await checkboxPage.extendAndCollapseFolderTreeByText('Desktop')
        await checkboxPage.assertIsCheckedOrNot('Desktop', 'is not checked');
        await checkboxPage.checkFolderOrFile('Desktop');
        await checkboxPage.assertIsCheckedOrNot('Desktop', 'is checked');
        await checkboxPage.checkSelectedFilesResultVisibility('Desktop', 'visible');
    });

    test('Check selected files for visibility - Desktop - Notes', async() => {
        await checkboxPage.checkSelectedFilesResultVisibility('DesktopNotes', 'not-visible');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home');
        await checkboxPage.extendAndCollapseFolderTreeByText('Desktop');
        await checkboxPage.checkFolderOrFile('DesktopNotes');
        await checkboxPage.assertIsCheckedOrNot('DesktopNotes', 'is checked');
        await checkboxPage.checkSelectedFilesResultVisibility('DesktopNotes', 'visible');
    });

    test('Check selected files for visibility - Desktop - Commands', async() => {
        await checkboxPage.checkSelectedFilesResultVisibility('DesktopCommands', 'not-visible');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home');
        await checkboxPage.extendAndCollapseFolderTreeByText('Desktop');
        await checkboxPage.checkFolderOrFile('DesktopCommands');
        await checkboxPage.assertIsCheckedOrNot('DesktopCommands', 'is checked');
        await checkboxPage.checkSelectedFilesResultVisibility('DesktopCommands', 'visible');
    });
});