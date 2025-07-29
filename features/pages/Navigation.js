class NavigationPage {
  get homeTab() { return $('~Home'); }
  get webviewTab() { return $('~Webview'); }
  get loginTab() { return $('~Login'); }
  get formsTab() { return $('~Forms'); }
  get swipeTab() { return $('~Swipe'); }

  async openTab(tabName) {
    await $(`~${tabName}`).click();
  }

  async isTabDisplayed(tabName) {
    return $(`~${tabName}-screen`).isDisplayed(); // ajuste conforme sua tela
  }

  async goToHome() {
    await this.homeTab.click();
  }

  async goToWebview() {
    await this.webviewTab.click();
  }

  async goToLogin() {
    await this.loginTab.click();
  }

  async goToForms() {
    await this.formsTab.click();
  }

  async goToSwipe() {
    await this.swipeTab.click();
  }
}

export default new NavigationPage();
