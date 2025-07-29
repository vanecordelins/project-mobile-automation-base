import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pages/LoginPage.js';

Given('o usuário está na tela de login', async () => {
  await LoginPage.open();
});

When('ele preenche o campo de usuário e senha corretamente', async () => {
  await LoginPage.login('usuario_teste', 'senha_teste');
});

When('clica no botão de login', async () => {
  await LoginPage.submitLogin();
});

Then('ele deve ser redirecionado para a tela principal', async () => {
  await expect(await LoginPage.isLoggedIn()).toBeTruthy();
});