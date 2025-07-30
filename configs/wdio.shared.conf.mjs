export const config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'apps\\android.wdio.native.app.v1.0.8.apk',
    'appium:autoGrantPermissions': true
  }],
  logLevel: 'info',
  reporters: ['spec'],
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./steps/**/*.js'],
    timeout: 60000,
  },
  services: ['appium'],
  port: 4723,
  path: '/wd/hub',
};
