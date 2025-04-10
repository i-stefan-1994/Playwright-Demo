import { test } from "../utils/fixtures";

let checkboxPage;

test.describe("Checkbox tests", () => {
    test.beforeEach(async ({ pom_manager, page }) => {
        checkboxPage = await pom_manager.getDemoQA_CheckboxPage();
        await checkboxPage.navigateToCheckboxPage();
        checkboxPage.hasUrl(/checkbox/);
    });

    test('Checks the Home folder', async () => {
        await checkboxPage.assertIsNotChecked();
        await checkboxPage.checkFolderOrFile('Home');
        await checkboxPage.assertIsChecked();
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
        await checkboxPage.checkSelectedFilesResultVisibility('Home', 'notVisible');
        await checkboxPage.extendAndCollapseFolderTreeByText('Home')
        await checkboxPage.extendAndCollapseFolderTreeByText('Desktop')
        await checkboxPage.checkFolderOrFile('Desktop');
        await checkboxPage.checkSelectedFilesResultVisibility('Desktop', 'visible');
    });
});