import {test, expect} from '../utils/fixtures';
// import { POM_Manager } from "../pages/pom_manager";

// let pom_manager;
let elementsPage;
const userData = {
    username: 'Tester',
    email: 'test@test.com',
    currentAddress : 'Test street, Testsylvannia'
}

test.describe('Elements page tests', () => {
    test.beforeEach(async ({pom_manager, page}) => {
        // pom_manager = new POM_Manager(page);
        elementsPage = pom_manager.getDemoQA_ElementsPage();
        await elementsPage.navigateToElementsPage();
        await expect(page).toHaveURL(/elements/);
    });

    test('Fill out all text box elements', async() => {
        await elementsPage.selectTextCategory();
        await elementsPage.fillUserName(userData.username);
        await elementsPage.fillEmail(userData.email);
        await elementsPage.fillCurrentAddress(userData.currentAddress);
    });

    //fill out everything but name, email, address, permanent address, check submit

});