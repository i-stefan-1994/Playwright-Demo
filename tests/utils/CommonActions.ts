import { Page } from 'playwright';

export default class CommonActions {
    constructor(public readonly page: Page) {
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
        }else{
            return text.trim();
        }
    }

    async isChecked(selector){
        return await this.page.isChecked(selector);
    }
}