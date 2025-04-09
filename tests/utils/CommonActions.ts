import { Page } from 'playwright';
import { expect, Locator } from 'playwright/test';

export default class CommonActions {

    constructor(public readonly page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async fill(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text)
    }

    async getText(selector: string): Promise<string> {
        const text = await this.page.locator(selector).textContent();
        if (text === null) {
            throw new Error('No text found')
        } else {
            return text.trim();
        }
    }

    async isChecked(selector: string): Promise<boolean> {
        return await this.page.isChecked(selector);
    }

    async hasUrl(url: string | RegExp): Promise<void> {
        return await expect(this.page).toHaveURL(url);
    }

    async textIsVisible(...text: string[]): Promise<void> {
        for (const name of text) {
            await expect(this.page.getByText(name, {exact: true})).toBeVisible();
        }
    };

    async textIsNotVisible(...text: string[]): Promise<void>{
        for (const name of text){
            await expect(this.page.getByText(name, {exact: true})).toBeHidden();
        }
    }
}