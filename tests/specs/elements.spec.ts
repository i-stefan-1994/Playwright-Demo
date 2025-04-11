import {test, expect, MyFixtures} from '../utils/fixtures';

let elementsPage: ReturnType<MyFixtures['pom_manager']['getDemoQA_ElementsPage']>;
const userData = {
    username: 'Tester',
    email: 'test@test.com',
    currentAddress : 'Test street, Testsylvannia',
    permanentAddress: 'Testissimo, Testudo'
};
const wrongUserData = {
    email: 'wrongemailformat'
};

test.describe('Elements page tests', () => {
    test.beforeEach(async ({pom_manager, page}) => {
        elementsPage = pom_manager.getDemoQA_ElementsPage();
        await elementsPage.navigateToElementsPage();
        await expect(page).toHaveURL(/elements/);
    });

    test('Fill out all text box elements', async() => {
        await elementsPage.fillTextbox({name: userData.username, email: userData.email, currentAddress: userData.currentAddress, permanentAddress: userData.permanentAddress})
        await elementsPage.expectOutputValue('name', userData.username);
        await elementsPage.expectOutputValue('email', userData.email);
        await elementsPage.expectOutputValue('currentAddress', userData.currentAddress);
        await elementsPage.expectOutputValue('permanentAddress', userData.permanentAddress);
    });

    test('Fill out everything except name', async () => {
        await elementsPage.fillTextbox({ email: userData.email, currentAddress: userData.currentAddress, permanentAddress: userData.permanentAddress})
        await elementsPage.expectFieldToBeMissing('name');
        await elementsPage.expectOutputValue('email', userData.email);
        await elementsPage.expectOutputValue('currentAddress', userData.currentAddress);
        await elementsPage.expectOutputValue('permanentAddress', userData.permanentAddress);
    });

    test('Fill out everything except email', async() => {
        await elementsPage.fillTextbox({name: userData.username, currentAddress: userData.currentAddress, permanentAddress: userData.permanentAddress})
        await elementsPage.expectOutputValue('name', userData.username);
        await elementsPage.expectFieldToBeMissing('email');
        await elementsPage.expectOutputValue('currentAddress', userData.currentAddress);
        await elementsPage.expectOutputValue('permanentAddress', userData.permanentAddress);
    });

    test('Fill out everything except currentAddress', async() => {
        await elementsPage.fillTextbox({name: userData.username, email: userData.email, permanentAddress: userData.permanentAddress})
        await elementsPage.expectOutputValue('name', userData.username);
        await elementsPage.expectOutputValue('email', userData.email);
        await elementsPage.expectFieldToBeMissing('currentAddress');
        await elementsPage.expectOutputValue('permanentAddress', userData.permanentAddress);
    });
    
    test('Fill out everything except permanent address', async() => {
        await elementsPage.fillTextbox({name: userData.username, email: userData.email, currentAddress: userData.currentAddress})
        await elementsPage.expectOutputValue('name', userData.username);
        await elementsPage.expectOutputValue('email', userData.email);
        await elementsPage.expectOutputValue('currentAddress', userData.currentAddress);
        await elementsPage.expectFieldToBeMissing('permanentAddress');
    });

    test('Fill out wrong email format', async() => {
        await elementsPage.fillTextbox({email: wrongUserData.email});
        await elementsPage.expectWrongEmailFormatError();
    });
});