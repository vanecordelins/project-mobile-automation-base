# Migration Examples: Before/After Utility Adoption

This document shows concrete examples of how page objects were refactored to use shared utilities, demonstrating the reduction in code duplication.

---

## Example 1: Platform-Specific Selectors

### Before (Manual Platform Conditionals)

```javascript
// Old pattern: Repeated in every page object
class LoginPage {
  get loginButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Login")')
      : $('~Login');
  }

  get successMessage() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/message")')
      : $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name CONTAINS "You are logged in!"');
  }
}
```

### After (Using Selector Utilities)

```javascript
// New pattern: Use centralized selector utilities
import { createTextSelector, createResourceSelector } from '../utils/selectorHelper.js';
import { ANDROID_IDS } from '../utils/constants.js';

class LoginPage {
  get loginButton() {
    return $(createTextSelector("Login"));
  }

  get successMessage() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_MESSAGE,
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "You are logged in!"'
    ));
  }
}
```

**Benefits**:
- Platform logic centralized in one place
- Easier to update selector patterns
- Reduces 3 lines to 1 line per getter
- Constants ensure consistency across pages

---

## Example 2: Allure Reporting and Screenshots

### Before (Manual Allure Integration)

```javascript
// Old pattern: Manual Allure step + screenshot in every method
import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class HomePage {
  async clickButton(btnText) {
    allureReporter.addStep(`Click on "${btnText}" button`);
    const button = browser.isAndroid
      ? $(`android=new UiSelector().text("${btnText}")`)
      : $(`~${btnText}`);
    await button.waitForDisplayed();
    await button.click();
    await takeScreenshotAndAddToReport(`Clicked "${btnText}" button`);
  }
}
```

### After (Using Combined Utility)

```javascript
// New pattern: Single function call for Allure + screenshot
import { createTextSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';

class HomePage {
  async clickButton(btnText) {
    await logStepWithScreenshot(`Click on "${btnText}" button`);
    const button = $(createTextSelector(btnText));
    await button.waitForDisplayed();
    await button.click();
  }
}
```

**Benefits**:
- Reduces 5 lines to 2 lines per method
- Single import instead of two
- Automatic error handling for screenshot failures
- Consistent step naming across all pages

---

## Example 3: Timeout Constants

### Before (Hard-Coded Timeouts)

```javascript
// Old pattern: Magic numbers scattered throughout code
class NavigationPage {
  async openSwipePage() {
    allureReporter.addStep('Opening Swipe screen');
    const swipeTab = browser.isAndroid
      ? $('android=new UiSelector().text("Swipe")')
      : $('~Swipe');
    await swipeTab.waitForDisplayed({ timeout: 5000 }); // Hard-coded
    await swipeTab.click();
    await takeScreenshotAndAddToReport('Swipe screen opened');
  }

  async getErrorMessage(expectedText) {
    allureReporter.addStep(`Verifying error message: "${expectedText}"`);
    const selector = browser.isAndroid
      ? $(`android=new UiSelector().text("${expectedText}")`)
      : $(`~${expectedText}`);
    await selector.waitForDisplayed({ timeout: 3000 }); // Different timeout
    await takeScreenshotAndAddToReport(`Error message displayed`);
    return await selector.getText();
  }
}
```

### After (Using Timeout Constants)

```javascript
// New pattern: Centralized timeout configuration
import { createTextSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS } from '../utils/constants.js';

class NavigationPage {
  async openSwipePage() {
    await logStepWithScreenshot('Opening Swipe screen');
    const swipeTab = $(createTextSelector("Swipe"));
    await swipeTab.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    await swipeTab.click();
  }

  async getErrorMessage(expectedText) {
    await logStepWithScreenshot(`Verifying error message: "${expectedText}"`);
    const selector = $(createTextSelector(expectedText));
    await selector.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT });
    return await selector.getText();
  }
}
```

**Benefits**:
- Single source of truth for timeout values
- Easy to adjust timeouts globally
- Semantic naming (ELEMENT_WAIT vs 5000)
- Consistent behavior across pages

---

## Example 4: Complete Page Refactoring

### Before (SignUpPage - 120 lines with duplication)

```javascript
import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class SignUpPage {
  get loginButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Login")')
      : $('~Login');
  }

  get signUpLink() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Sign up")')
      : $('~Sign up');
  }

  get emailInput() {
    return $('~input-email');
  }

  get popupMessage() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/message")')
      : $('-ios predicate string:type == "XCUIElementTypeStaticText"');
  }

  get okButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/button1")')
      : $('~OK');
  }

  async open() {
    allureReporter.addStep('Navigating to Sign Up Page');
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
    await this.signUpLink.waitForDisplayed();
    await this.signUpLink.click();
    await takeScreenshotAndAddToReport('Sign Up Page opened');
  }

  async setEmail(email) {
    allureReporter.addStep('Filling email field');
    await this.emailInput.setValue(email);
    await takeScreenshotAndAddToReport('Email field filled');
  }

  async handleSuccessPopup() {
    allureReporter.addStep('Handling success popup after sign up');
    await this.popupMessage.waitForDisplayed({ timeout: 3000 });
    const message = await this.popupMessage.getText();
    await takeScreenshotAndAddToReport(`Popup message retrieved: "${message}"`);
    expect(message).toEqual('You successfully signed up!');
    await this.okButton.click();
    await takeScreenshotAndAddToReport('Popup confirmed');
  }

  // ... 9 total methods with similar patterns
}

export default new SignUpPage();
```

### After (SignUpPage - 103 lines, cleaner code)

```javascript
import { createTextSelector, createAccessibilitySelector, createResourceSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS, ANDROID_IDS, IOS_SELECTORS } from '../utils/constants.js';

class SignUpPage {
  get loginButton() {
    return $(createTextSelector("Login"));
  }

  get signUpLink() {
    return $(createTextSelector("Sign up"));
  }

  get emailInput() {
    return $(createAccessibilitySelector('input-email'));
  }

  get popupMessage() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_MESSAGE,
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "You successfully signed up"'
    ));
  }

  get okButton() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_BUTTON_POSITIVE,
      IOS_SELECTORS.ALERT_OK.replace('~', '')
    ));
  }

  async open() {
    await logStepWithScreenshot('Navigating to Sign Up Page');
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
    await this.signUpLink.waitForDisplayed();
    await this.signUpLink.click();
  }

  async setEmail(email) {
    await logStepWithScreenshot('Filling email field');
    await this.emailInput.setValue(email);
  }

  async handleSuccessPopup() {
    await logStepWithScreenshot('Handling success popup after sign up');
    await this.popupMessage.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT });
    const message = await this.popupMessage.getText();
    expect(message).toEqual('You successfully signed up!');
    await this.okButton.click();
  }

  // ... 9 total methods, all refactored consistently
}

export default new SignUpPage();
```

**Benefits**:
- 17 fewer lines of code (14% reduction)
- 7 platform conditionals eliminated
- 18 manual Allure/screenshot calls replaced
- Consistent timeout usage
- Single import for all selectors
- Easier to read and maintain

---

## Summary of Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Total lines (5 pages)** | 395 lines | 260 lines | -34% |
| **Platform conditionals** | 27 instances | 0 instances | -100% |
| **Manual Allure calls** | 68+ instances | 0 instances | -100% |
| **Hard-coded timeouts** | 12 instances | 0 instances | -100% |
| **Import statements** | 2 per file | 1-3 per file | Consolidated |
| **Resource ID duplication** | 15 instances | 0 instances | -100% |

---

## Migration Steps for New Pages

1. **Identify duplicate patterns**: Look for `browser.isAndroid`, `allureReporter.addStep()`, `takeScreenshotAndAddToReport()`
2. **Replace selectors**: Use `createTextSelector()`, `createAccessibilitySelector()`, or `createResourceSelector()`
3. **Replace Allure integration**: Use `logStepWithScreenshot()` for combined reporting
4. **Replace timeouts**: Use `TIMEOUTS` constants from `constants.js`
5. **Test thoroughly**: Run existing feature tests to ensure no behavioral changes
6. **Verify Allure reports**: Confirm steps and screenshots still appear correctly

---

_Last updated: Phase 3 migration completion_
