import { test } from "../utils/fixtures";

let checkboxPage;

test.describe("Checkbox tests", () => {
    test.beforeEach(async ({pom_manager, page}) => {
        checkboxPage = await pom_manager.getDemoQA_CheckboxPage();
        await checkboxPage.navigateToCheckboxPage();
        checkboxPage.hasUrl(/checkbox/);
    });

    test('Checks the Home folder', async() => {
       await checkboxPage.checkHomeFolder();
       await checkboxPage.assertIsChecked();
    });
});