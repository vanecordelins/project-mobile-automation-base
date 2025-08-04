const isBrowserStack = process.env.USE_BROWSERSTACK === 'true';

export const config = {
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

  ...(isBrowserStack
    ? {
        user: process.env.BROWSERSTACK_USERNAME,
        key: process.env.BROWSERSTACK_ACCESS_KEY,
        hostname: 'hub.browserstack.com',
        protocol: 'https',
        port: 443
      }
    : {
        runner: 'local',
        services: ['appium'],
        port: 4723,
        path: '/wd/hub'
      }),

  capabilities: [
    process.env.PLATFORM === 'ios'
      ? {
          platformName: 'iOS',
          'appium:platformVersion': isBrowserStack ? '16' : '17.5',
          'appium:deviceName': 'iPhone 14',
          'appium:automationName': 'XCUITest',
          'appium:app': isBrowserStack
            ? 'bs://c9438e138db08f638d896b96c068f947c8a0bf69'
            : process.cwd() + '/apps/wdiodemoapp.app',
          'appium:autoAcceptAlerts': true,
          ...(isBrowserStack && {
            'appium:project': 'Mobile Tests',
            'appium:build': 'GitHub Actions CI',
            'appium:name': 'iOS test'
          })
        }
      : {
          platformName: 'Android',
          'appium:deviceName': isBrowserStack
            ? 'Samsung Galaxy S22'
            : 'Android Emulator',
          'appium:os_version': isBrowserStack ? '12.0' : undefined,
          'appium:automationName': 'UiAutomator2',
          'appium:app': isBrowserStack
            ? 'bs://c9438e138db08f638d896b96c068f947c8a0bf69'
            : process.cwd() + '/apps/android.wdio.native.app.v1.0.8.apk',
          'appium:autoGrantPermissions': true,
          ...(isBrowserStack && {
            'appium:project': 'Mobile Tests',
            'appium:build': 'GitHub Actions CI',
            'appium:name': 'Android test'
          })
        }
  ]
};
