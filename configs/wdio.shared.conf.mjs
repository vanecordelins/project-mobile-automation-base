export const config = {
  runner: 'local',
  maxInstances: 1,
  logLevel: 'info',
  framework: 'cucumber',
  reporters: ['spec'],
  specs: [],

  cucumberOpts: {
    timeout: 60000,
    require: [] // será sobrescrito
  }
};
