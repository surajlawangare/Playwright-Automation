class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async click(locator) {
        await locator.click();
    }

     async fill(locator, value) {
        await locator.fill(value);
    }

    async getText(locator) {
       return await locator.textContent();
    }

    async isVisible() {
        return await locator.isVisible();
    }

    async waitforVisible(locator) {
        await locator.waitfor({
            state : 'visible'
        });
    }

    async takeScreenshot() {
        await this.page.takeScreenshot({
            path : 'screenshots/${name}.png',
            fullpage : true
        });
    }

}

module.exports = BasePage;