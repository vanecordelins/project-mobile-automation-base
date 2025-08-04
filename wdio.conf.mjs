import { config as baseConfig } from './configs/wdio.shared.conf.mjs';

export const config = {
  ...baseConfig,
  specs: ['./features/**/*.feature'],
  reporters: ['spec', ['allure', {
    outputDir: 'reports/allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
  }]],
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./features/step-definitions/*.js'],
    timeout: 60000
  },
  afterStep: async function (step, scenario, result) {
  if (result.error) {
    await browser.takeScreenshot();
    }
  },
};