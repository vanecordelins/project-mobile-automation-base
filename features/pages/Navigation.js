class NavigationPage {
  // Botões de navegação com UiSelector
  get homeTab() {
    return $('android=new UiSelector().text("Home")');
  }

  get webviewTab() {
    return $('android=new UiSelector().text("Webview")');
  }

  get loginTab() {
    return $('android=new UiSelector().text("Login").instance(1)');
  }

  get formsTab() {
    return $('android=new UiSelector().text("Forms")');
  }

  get swipeTab() {
    return $('android=new UiSelector().text("Swipe")');
  }

  // Métodos de navegação
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

  async isTabDisplayed(tabName) {
    return $(`~${tabName}-screen`).isDisplayed(); // ajustável conforme seus IDs reais
  }
}

export default new NavigationPage();
