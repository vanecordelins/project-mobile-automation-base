export const config = {
  runner: 'local',
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:platformVersion': '11.0',
    'appium:app': '/path/to/native-demo-app.apk',
    'appium:automationName': 'UiAutomator2'
  }],
  services: ['appium']
};