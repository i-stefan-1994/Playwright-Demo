// @ts-check

import { expect, test } from "playwright/test";
import { POM_Manager } from "../pages/pom_manager";

let pom_manager; 

test('Main page tests', async ({page}) => {

    pom_manager = new POM_Manager(page);
    const demoQA_Page = pom_manager.getDemoQA_HomePage()

    await test.step('Has title DEMOQA', async () => {
        demoQA_Page.navigateToMainPage();
        await expect(page).toHaveTitle('DEMOQA');
    });

    await test.step('Can navigate to Elements category from main page', async () => {
        await demoQA_Page.navigateToElementsCategory();
        await expect(page).toHaveURL(/elements/);
    });

    await test.step('Can navigate to Forms category from main page', async () => {
        await demoQA_Page.navigateToMainPage();
        await demoQA_Page.navigateToFormsCategory();
        await expect(page).toHaveURL(/forms/);
    });

    await test.step('Can navigate to Alerts, Frame & Windows category from main page', async() => {
        await demoQA_Page.navigateToMainPage();
        await demoQA_Page.navigateToAlertsFramesAndWindowsCategory();
        await expect(page).toHaveURL(/alertsWindows/);
    });

    await test.step('Can navigate to Widgets category from main page', async() => {
        await demoQA_Page.navigateToMainPage();
        await demoQA_Page.navigateToWidgetsCategory();
        await expect(page).toHaveURL(/widgets/);
    });

    await test.step('Can navigate to Interactions category from main page', async() => {
        await demoQA_Page.navigateToMainPage();
        await demoQA_Page.navigateToInteractionsCategory();
        await expect(page).toHaveURL(/interaction/);
    });

    await test.step('Can navigate to Book Store Application category from main page', async() => {
        await demoQA_Page.navigateToMainPage();
        await demoQA_Page.navigateToBookStoreApplicationCategory();
        await expect(page).toHaveURL(/books/);
    });
});

