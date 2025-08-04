export const config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'info',
  reporters: ['spec'],
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./features/step-definitions/*.js'],
    timeout: 60000
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
          'appium:app': process.cwd() + '/apps/wdiodemoapp.app',
          'appium:autoAcceptAlerts': true
        }
      : {
          platformName: 'Android',
          'appium:deviceName': 'Android Emulator',
          'appium:automationName': 'UiAutomator2',
          'appium:app': process.cwd() + '/apps/android.wdio.native.app.v1.0.8.apk',
          'appium:autoGrantPermissions': true
        }
  ]
};
