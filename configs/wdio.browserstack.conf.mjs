import { fileURLToPath } from 'url';
import path from 'path';
import { config as sharedConfig } from './wdio.shared.conf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');

const isIOS = process.env.PLATFORM === 'ios';

export const config = {
  ...sharedConfig,

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: [path.join(rootPath, 'features', '**', '*.feature')],

  cucumberOpts: {
    ...sharedConfig.cucumberOpts,
    require: [path.join(rootPath, 'features', 'step-definitions', '**', '*.js')]
  },

  services: ['browserstack'],
  hostname: 'hub.browserstack.com',

  capabilities: [
    isIOS
      ? {
          platformName: 'iOS',
          'appium:deviceName': 'iPhone 14',
          'appium:platformVersion': '17.5',
          'appium:automationName': 'XCUITest',
          'appium:app': process.env.BROWSERSTACK_APP_ID || 'bs://<ios-app-id>',
          'appium:autoAcceptAlerts': true
        }
      : {
          platformName: 'Android',
          'appium:deviceName': 'Google Pixel 7',
          'appium:platformVersion': '13.0',
          'appium:automationName': 'UiAutomator2',
          'appium:app': process.env.BROWSERSTACK_APP_ID || 'bs://<android-app-id>',
          'appium:autoGrantPermissions': true
        }
  ]
};
