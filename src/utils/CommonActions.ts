import { Page } from 'playwright';

export default class CommonActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void>{
        await this.page.goto(url);
    }

    async click(selector){
        await this.page.click(selector);
    }
}