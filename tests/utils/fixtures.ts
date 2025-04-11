import { POM_Manager } from "../pages/pom_manager";
import {test as base, Page} from '@playwright/test';

//more details about playwright fixtures https://playwright.dev/docs/test-fixtures

export type MyFixtures = {
    pom_manager: POM_Manager;
    page: Page
};

export const test = base.extend<MyFixtures>({
    pom_manager: async({page}, use) => {
        await use(new POM_Manager(page));
    }
});

export {expect} from '@playwright/test';