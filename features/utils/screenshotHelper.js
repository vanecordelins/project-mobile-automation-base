import allureReporter from '@wdio/allure-reporter';

export async function takeScreenshotAndAddToReport(stepName) {
  const screenshot = await browser.takeScreenshot();
  allureReporter.addAttachment(
    stepName,
    Buffer.from(screenshot, 'base64'),
    'image/png'
  );
}
