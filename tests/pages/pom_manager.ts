import { Page } from "@playwright/test";
import { DemoQA_HomePage } from "./demoqa_home_page";
import { ElementsPage } from "./elements_page";
import { CheckboxPage } from "./checkbox_page";

export class POM_Manager {
    private demoQA_homePage: DemoQA_HomePage | undefined;
    private demoQA_elementsPage: ElementsPage | undefined;
    private demoQA_checkboxPage: CheckboxPage | undefined;

    constructor(private page: Page) {}

    getDemoQA_HomePage() {
        if (!this.demoQA_homePage) {
            this.demoQA_homePage = new DemoQA_HomePage(this.page);
        }
        return this.demoQA_homePage;
    }

    getDemoQA_ElementsPage() {
        if (!this.demoQA_elementsPage) {
            this.demoQA_elementsPage = new ElementsPage(this.page);
        }
        return this.demoQA_elementsPage;
    }

    getDemoQA_CheckboxPage(){
        if(!this.demoQA_checkboxPage){
            this.demoQA_checkboxPage = new CheckboxPage(this.page);
        }
        return this.demoQA_checkboxPage;
    }
}