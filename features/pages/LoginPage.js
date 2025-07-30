class LoginPage {
  // Botão que leva para a tela de login
  get loginMenuButton() {
    return $('android=new UiSelector().text("Login")');
  }

  // Campos de input
  get emailInput() {
    return $('~input-email'); // usando content-desc conforme padrão do projeto
  }

  get passwordInput() {
    return $('~input-password');
  }

  // Botão de login
  get loginButton() {
    return $('android=new UiSelector().className("android.view.ViewGroup").instance(16)');
  }

  async open() {
    await driver.launchApp();
    await this.loginMenuButton.waitForDisplayed();
    await this.loginMenuButton.click();
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async isLoggedIn() {
    const homeScreen = $('~home-screen'); // se usar outro identificador, me avisa
    return homeScreen.isDisplayed();
  }
}

export default new LoginPage();
