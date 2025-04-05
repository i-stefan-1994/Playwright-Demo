import { Page } from "@playwright/test";
import CommonActions from "../utils/CommonActions";


export class DemoQA_HomePage extends CommonActions{

    private demo_QA_homepage_URL = 'https://demoqa.com/';

    constructor(public readonly page: Page){
        super(page)
    };

    async navigateToMainPage(){
        await this.page.goto(this.demo_QA_homepage_URL);
    };

    async navigateToElementsCategory(){
       await this.page.getByText('Elements').click();
    }

    async navigateToFormsCategory(){
        await this.page.getByText('Forms').click();
    }

    async navigateToAlertsFramesAndWindowsCategory(){
        await this.page.getByText('Alerts, Frame & Windows').click();
    }

    async navigateToWidgetsCategory(){
        await this.page.getByText('Widgets').click();
    }

    async navigateToInteractionsCategory(){
        await this.page.getByText('Interactions').click();
    }

    async navigateToBookStoreApplicationCategory(){
        await this.page.getByText('Book Store Application').click();
    };
}