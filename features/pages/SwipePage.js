class SwipePage {
  get swipeScreen() { return $('~Swipe-screen'); }
  get carousel() { return $('~carousel'); }
  get cardTitles() { return $$('~card-title'); }

  // Elementos para validação
  get greatCommunityText() {
    return $('android=new UiSelector().text("GREAT COMMUNITY")');
  }

  get jsFoundationText() {
    return $('android=new UiSelector().text("JS.FOUNDATION")');
  }

  // Métodos usados nos steps para validação
  async isCommunityCardVisible() {
    return this.greatCommunityText.isDisplayed();
  }

  async isJSFoundationVisible() {
    return this.jsFoundationText.isDisplayed();
  }

  async open() {
    await driver.launchApp();
    await $('~Swipe').click();
  }

  async swipeLeft() {
    await driver.touchPerform([
      { action: 'press', options: { x: 800, y: 500 }},
      { action: 'wait', options: { ms: 200 }},
      { action: 'moveTo', options: { x: 100, y: 500 }},
      { action: 'release' }
    ]);
  }

  async swipeRight() {
    await driver.touchPerform([
      { action: 'press', options: { x: 100, y: 500 }},
      { action: 'wait', options: { ms: 200 }},
      { action: 'moveTo', options: { x: 800, y: 500 }},
      { action: 'release' }
    ]);
  }

  async getVisibleCardTitles() {
    return Promise.all(this.cardTitles.map(card => card.getText()));
  }

  async isTextVisible(element) {
    return element.isDisplayed();
  }
}

export default new SwipePage();
