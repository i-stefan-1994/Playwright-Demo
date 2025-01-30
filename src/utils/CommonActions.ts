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

    async fill(selector, text){
        await this.page.fill(selector, text)
    }

    async getText(selector){
        const text = await this.page.locator(selector).textContent();
        if(text === null){
            throw new Error('No text found')
        }
    }
}