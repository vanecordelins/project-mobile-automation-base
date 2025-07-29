class SwipePage {
  get swipeScreen() { return $('~Swipe-screen'); }
  get carousel() { return $('~carousel'); }
  get cardTitles() { return $$('~card-title'); }

  async open() {
    await driver.launchApp(); // ou navegue direto se já estiver no app
    await $('~Swipe').click(); // botão/menu para acessar a tela de swipe
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
}

export default new SwipePage();
