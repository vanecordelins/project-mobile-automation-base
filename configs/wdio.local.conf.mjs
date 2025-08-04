import { fileURLToPath } from 'url';
import path from 'path';
import { config as sharedConfig } from './wdio.shared.conf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');

export const config = {
  ...sharedConfig,

  specs: [path.join(rootPath, 'features', '**', '*.feature')],

  cucumberOpts: {
    ...sharedConfig.cucumberOpts,
    require: [path.join(rootPath, 'features', 'step-definitions', '**', '*.js')]
  },

  services: ['appium'],
  port: 4723,
  path: '/wd/hub',

  capabilities: [
    process.env.PLATFORM === 'ios'
      ? {
          platformName: 'iOS',
          'appium:platformVersion': '17.5',
          'appium:deviceName': 'iPhone 14',
          'appium:automationName': 'XCUITest',
          'appium:app': path.join(rootPath, 'apps', 'wdiodemoapp.app'),
          'appium:autoAcceptAlerts': true
        }
      : {
          platformName: 'Android',
          'appium:deviceName': 'Android Emulator',
          'appium:automationName': 'UiAutomator2',
          'appium:app': path.join(rootPath, 'apps', 'android.wdio.native.app.v1.0.8.apk'),
          'appium:autoGrantPermissions': true
        }
  ]
};
