# Utility Usage Guidelines

This guide helps developers decide when and how to use the shared utilities in the mobile test automation framework.

---

## Decision Tree: When to Use What

```
┌─────────────────────────────────┐
│ Creating a NEW page object?     │
└────────────┬────────────────────┘
             │
             ├─ Yes → Use BasePage inheritance (recommended)
             │        └─ See "BasePage Approach" below
             │
             └─ No → Migrating existing page?
                     │
                     ├─ Small migration (1-3 methods) → Direct utility imports
                     │                                   └─ See "Direct Import Approach"
                     │
                     └─ Large migration (4+ methods) → Consider BasePage extension
                                                       └─ See "Incremental Migration"
```

---

## 1. BasePage Inheritance (Recommended for New Pages)

### When to Use
- ✅ Creating a brand new page object
- ✅ Want all utilities available without manual imports
- ✅ Prefer cleaner, more maintainable code
- ✅ Don't need custom selector logic

### How to Use

```javascript
import BasePage from './BasePage.js';

class NewFeaturePage extends BasePage {
  // Implement abstract open() method (required)
  async open() {
    await this.clickButton("New Feature");
  }

  // Use inherited utility methods
  async fillForm(email, password) {
    await this.setText("input-email", email);
    await this.setText("input-password", password);
    await this.clickButton("Submit");
  }

  // Use inherited selector methods
  get welcomeMessage() {
    const selector = this.getTextSelector("Welcome");
    return $(selector);
  }

  // Custom getters still work normally
  get customElement() {
    return $('~custom-id');
  }
}

// IMPORTANT: Export as singleton (BasePage is NOT a singleton)
export default new NewFeaturePage();
```

### Available Methods from BasePage

**Selector Methods**:
- `this.getTextSelector(text)` - Text-based selectors
- `this.getAccessibilitySelector(id)` - Accessibility ID selectors
- `this.getResourceSelector(androidId, iosSelector)` - Platform-specific resource IDs

**Action Methods**:
- `this.clickButton(buttonText, options)` - Click with Allure reporting
- `this.setText(accessibilityId, value)` - Set input value with reporting
- `this.waitForElement(selector, options)` - Wait for element display
- `this.getPopupMessage()` - Get popup text
- `this.confirmPopup()` - Click OK on popup
- `this.isElementVisible(selector, options)` - Check visibility
- `this.logStep(description, options)` - Manual Allure step logging

### Pros
✅ No manual utility imports needed
✅ Cleaner, more concise code
✅ Automatic Allure integration
✅ Consistent patterns across pages
✅ Easy to extend with custom methods

### Cons
❌ Requires understanding of inheritance
❌ All pages must implement `open()` method
❌ Less flexibility for highly custom implementations

---

## 2. Direct Utility Imports (Best for Incremental Migration)

### When to Use
- ✅ Migrating existing page objects gradually
- ✅ Need fine-grained control over utility usage
- ✅ Only a few methods need refactoring
- ✅ Complex custom logic requiring flexibility

### How to Use

```javascript
// Import only what you need
import { createTextSelector, createAccessibilitySelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS } from '../utils/constants.js';

class ExistingPage {
  // Use utilities in getters
  get loginButton() {
    return $(createTextSelector("Login"));
  }

  get emailInput() {
    return $(createAccessibilitySelector('input-email'));
  }

  // Use utilities in methods
  async login(email, password) {
    await logStepWithScreenshot('Logging in user');
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  // Mix old and new patterns during migration
  async someOldMethod() {
    // Keep existing implementation during gradual migration
    allureReporter.addStep('Old method');
    await takeScreenshotAndAddToReport('Old screenshot');
  }
}

export default new ExistingPage();
```

### Pros
✅ Gradual migration - migrate method by method
✅ Maximum flexibility
✅ No architectural changes required
✅ Easy to mix with existing code
✅ Fine-grained control over imports

### Cons
❌ More imports to manage
❌ Can lead to inconsistency if not careful
❌ More verbose than BasePage approach
❌ Need to repeat utility calls in each method

---

## 3. When to Use Custom Implementations

### Use Custom Code When:

❌ **Complex selector logic** - Utilities don't cover your specific case
```javascript
// Custom: Dynamic selector based on runtime conditions
get dynamicElement() {
  const type = this.userType;
  const platform = browser.isAndroid;
  // Complex logic that utilities can't handle
  return platform
    ? $(`android=new UiSelector().className("${type}")`)
    : $(`~custom-${type}-selector`);
}
```

❌ **Special Allure formatting** - Need custom step structure
```javascript
// Custom: Allure with attachments or special formatting
async uploadFile(filePath) {
  allureReporter.addStep('Uploading file');
  allureReporter.addAttachment('File path', filePath, 'text/plain');
  // Custom upload logic
  await takeScreenshotAndAddToReport('File uploaded');
}
```

❌ **Performance-critical paths** - Avoid utility overhead
```javascript
// Custom: Direct WebDriverIO for performance
async fastBulkOperation() {
  // Skip utilities for tight loops
  for (let i = 0; i < 1000; i++) {
    await $('~element').click(); // Direct, no utility overhead
  }
}
```

---

## 4. Timeout Configuration Patterns

### Standard Timeouts (Use Constants)

```javascript
import { TIMEOUTS } from '../utils/constants.js';

// Element waits
await element.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT }); // 5000ms

// Popup waits
await popup.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT }); // 3000ms

// Page loads
await page.waitForDisplayed({ timeout: TIMEOUTS.PAGE_LOAD }); // 10000ms
```

### Custom Timeouts (Override When Needed)

```javascript
// Slow-loading element - override default
await this.clickButton("Slow Button", { timeout: 15000 });

// Quick check - reduce timeout
const isVisible = await this.isElementVisible('~element', { timeout: 1000 });
```

### When to Override
- ✅ Known slow operations (file uploads, heavy computations)
- ✅ Quick existence checks (reduce timeout to fail fast)
- ✅ Network-dependent operations
- ❌ Don't override for every call - use defaults

---

## 5. Selector Strategy Decision Matrix

| Use Case | Recommended Utility | Example |
|----------|-------------------|---------|
| Visible button text | `createTextSelector()` | `createTextSelector("Login")` |
| Input field with accessibility ID | `createAccessibilitySelector()` | `createAccessibilitySelector('input-email')` |
| Android alert, iOS alert | `createResourceSelector()` + constants | `createResourceSelector(ANDROID_IDS.ALERT_MESSAGE, iOS predicate)` |
| Android description fallback | `createTextOrDescriptionSelector()` | `createTextOrDescriptionSelector("Sign Up", "button-SIGN UP")` |
| Complex custom selector | Manual implementation | `browser.isAndroid ? $('complex') : $('custom')` |

---

## 6. Action Helper Usage Patterns

### Button Clicks

```javascript
// Standard button click with reporting (recommended)
import { clickButton } from '../utils/actionHelper.js';
await clickButton("Submit");

// With custom timeout
await clickButton("Slow Button", { timeout: 10000 });

// Via BasePage
await this.clickButton("Submit");
```

### Popup Handling

```javascript
// Get popup message
import { getPopupMessage, confirmPopup } from '../utils/actionHelper.js';
const message = await getPopupMessage();
expect(message).toContain("Success");
await confirmPopup();

// Via BasePage
const message = await this.getPopupMessage();
await this.confirmPopup();
```

### Input Fields

```javascript
// Set input value with reporting
import { setInputValue } from '../utils/actionHelper.js';
await setInputValue("input-email", "test@example.com");

// Via BasePage
await this.setText("input-email", "test@example.com");
```

---

## 7. Allure Reporting Best Practices

### Standard Reporting (Use Utility)

```javascript
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';

// Automatic step + screenshot
await logStepWithScreenshot("User navigates to login page");

// Skip screenshot for non-visual steps
await logStepWithScreenshot("Starting test", { skipScreenshot: true });
```

### Step-Only Logging

```javascript
import { logStepOnly } from '../utils/screenshotHelper.js';

// No screenshot needed
logStepOnly("Test setup complete");
```

### When to Use Manual Allure

❌ Use manual `allureReporter` only when:
- Need to add custom attachments (files, JSON data)
- Need to modify step status programmatically
- Need to add environment or category information

---

## 8. Common Migration Patterns

### Pattern 1: Replace Platform Conditionals

**Before**:
```javascript
get element() {
  return browser.isAndroid
    ? $('android=new UiSelector().text("Text")')
    : $('~Text');
}
```

**After**:
```javascript
get element() {
  return $(createTextSelector("Text"));
}
```

### Pattern 2: Replace Allure + Screenshot

**Before**:
```javascript
async action() {
  allureReporter.addStep('Performing action');
  // ... action logic ...
  await takeScreenshotAndAddToReport('Action completed');
}
```

**After**:
```javascript
async action() {
  await logStepWithScreenshot('Performing action');
  // ... action logic ...
}
```

### Pattern 3: Replace Hard-Coded Timeouts

**Before**:
```javascript
await element.waitForDisplayed({ timeout: 5000 });
await popup.waitForDisplayed({ timeout: 3000 });
```

**After**:
```javascript
await element.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
await popup.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT });
```

---

## 9. Testing After Migration

### Validation Checklist

After refactoring a page object, verify:

- ✅ All existing feature tests pass
- ✅ Allure reports show steps and screenshots
- ✅ Platform-specific behavior works on both Android and iOS
- ✅ Timeout behavior is consistent
- ✅ Error messages are clear and actionable
- ✅ No regressions in step definitions

### Test Commands

```bash
# Run tests for specific feature
npm run test:feature ./features/login.feature

# Run tests on specific platform
npm run test:android
npm run test:ios

# Generate Allure report
npm run report:open
```

---

## 10. Summary: Quick Reference

| Scenario | Recommendation | Import |
|----------|----------------|--------|
| New page object | Extend BasePage | `import BasePage from './BasePage.js'` |
| Migrate 1-2 methods | Direct utility imports | `import { createTextSelector } from '../utils/selectorHelper.js'` |
| Migrate entire page | Direct imports OR extend BasePage | Both work - choose based on preference |
| Text selector | `createTextSelector()` | `selectorHelper.js` |
| Accessibility ID | `createAccessibilitySelector()` | `selectorHelper.js` |
| Resource ID | `createResourceSelector()` | `selectorHelper.js` |
| Allure + screenshot | `logStepWithScreenshot()` | `screenshotHelper.js` |
| Timeouts | `TIMEOUTS` constants | `constants.js` |
| Button click | `clickButton()` | `actionHelper.js` |
| Popup handling | `getPopupMessage()`, `confirmPopup()` | `actionHelper.js` |

---

_For detailed before/after examples, see `MIGRATION_EXAMPLES.md`_
