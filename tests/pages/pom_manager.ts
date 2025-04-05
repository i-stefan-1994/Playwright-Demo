import { Page } from "@playwright/test";
import { DemoQA_HomePage } from "./demoqa_home_page";

export class POM_Manager{

    private demoQA_homePage: DemoQA_HomePage | undefined;

    constructor(private page: Page){
        
    }

    getDemoQA_HomePage(){
        if(!this.demoQA_homePage){
            this.demoQA_homePage = new DemoQA_HomePage(this.page);
        }
        return this.demoQA_homePage;
    }
}