/**
 * Page Object Template
 *
 * This template demonstrates the recommended patterns for creating new page objects
 * using the shared utilities and BasePage class.
 *
 * Choose ONE approach:
 * - Approach 1: Extend BasePage (recommended for new pages)
 * - Approach 2: Direct utility imports (for gradual migration)
 */

// ========================================================================
// APPROACH 1: BasePage Inheritance (Recommended for New Page Objects)
// ========================================================================

import BasePage from './BasePage.js';

/**
 * Example page object using BasePage inheritance
 *
 * Benefits:
 * - All utility methods available through inheritance
 * - Cleaner, more concise code
 * - Automatic Allure integration
 * - Consistent patterns across the framework
 */
class MyPageWithBasePage extends BasePage {
  /**
   * REQUIRED: Implement abstract open() method
   * This method should navigate to or open this specific page
   */
  async open() {
    // Use inherited clickButton method with automatic Allure reporting
    await this.clickButton("My Feature");

    // Or use logStep for custom navigation
    await this.logStep("Opening My Feature page");
    // ... custom navigation logic ...
  }

  // ===== Element Getters =====

  /**
   * Example: Simple text-based element
   */
  get submitButton() {
    const selector = this.getTextSelector("Submit");
    return $(selector);
  }

  /**
   * Example: Accessibility ID element
   */
  get emailInput() {
    const selector = this.getAccessibilitySelector('input-email');
    return $(selector);
  }

  /**
   * Example: Platform-specific resource ID
   */
  get confirmationDialog() {
    const selector = this.getResourceSelector(
      'android:id/message',
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "Confirmed"'
    );
    return $(selector);
  }

  // ===== Action Methods =====

  /**
   * Example: Simple form filling using inherited setText method
   */
  async fillLoginForm(email, password) {
    await this.setText('input-email', email);
    await this.setText('input-password', password);
    await this.clickButton("Login");
  }

  /**
   * Example: Waiting for elements using inherited waitForElement
   */
  async waitForWelcomeMessage() {
    const selector = this.getTextSelector("Welcome");
    await this.waitForElement(selector, { timeout: 10000 });
  }

  /**
   * Example: Popup handling using inherited methods
   */
  async handleSuccessPopup() {
    const message = await this.getPopupMessage();
    expect(message).toContain("Success");
    await this.confirmPopup();
  }

  /**
   * Example: Custom validation method
   */
  async verifyPageLoaded() {
    const selector = this.getTextSelector("My Feature");
    const isVisible = await this.isElementVisible(selector);
    expect(isVisible).toBe(true);
  }
}

// IMPORTANT: Export as singleton (BasePage itself is NOT a singleton)
export default new MyPageWithBasePage();


// ========================================================================
// APPROACH 2: Direct Utility Imports (For Gradual Migration)
// ========================================================================

/*
// Uncomment this section to use direct imports instead of BasePage

import {
  createTextSelector,
  createAccessibilitySelector,
  createResourceSelector
} from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import {
  clickButton,
  setInputValue,
  getPopupMessage,
  confirmPopup
} from '../utils/actionHelper.js';
import { TIMEOUTS } from '../utils/constants.js';

class MyPageWithDirectImports {
  // ===== Element Getters =====

  get submitButton() {
    return $(createTextSelector("Submit"));
  }

  get emailInput() {
    return $(createAccessibilitySelector('input-email'));
  }

  get confirmationDialog() {
    return $(createResourceSelector(
      'android:id/message',
      'type == "XCUIElementTypeStaticText"'
    ));
  }

  // ===== Action Methods =====

  async open() {
    await logStepWithScreenshot("Opening My Feature page");
    await clickButton("My Feature");
  }

  async fillLoginForm(email, password) {
    await logStepWithScreenshot("Filling login form");
    await setInputValue('input-email', email);
    await setInputValue('input-password', password);
    await clickButton("Login");
  }

  async waitForWelcomeMessage() {
    await logStepWithScreenshot("Waiting for welcome message");
    const welcomeMsg = $(createTextSelector("Welcome"));
    await welcomeMsg.waitForDisplayed({ timeout: TIMEOUTS.PAGE_LOAD });
  }

  async handleSuccessPopup() {
    const message = await getPopupMessage();
    expect(message).toContain("Success");
    await confirmPopup();
  }

  async verifyPageLoaded() {
    await logStepWithScreenshot("Verifying page loaded");
    const pageTitle = $(createTextSelector("My Feature"));
    const isVisible = await pageTitle.isDisplayed();
    expect(isVisible).toBe(true);
  }
}

export default new MyPageWithDirectImports();
*/


// ========================================================================
// BEST PRACTICES & PATTERNS
// ========================================================================

/**
 * NAMING CONVENTIONS
 * ------------------
 * - Class name: PascalCase with "Page" suffix (e.g., LoginPage, SignUpPage)
 * - File name: PascalCase.js matching class name (e.g., LoginPage.js)
 * - Getter names: camelCase describing the element (e.g., submitButton, emailInput)
 * - Method names: camelCase describing the action (e.g., fillForm, clickSubmit)
 */

/**
 * ELEMENT GETTERS
 * ---------------
 * - Use getters for elements (get elementName() { return $(...); })
 * - Return WebDriverIO element objects, not raw selectors
 * - Keep getters simple - just return the element
 * - Group related getters together (e.g., all form inputs)
 */

/**
 * ACTION METHODS
 * --------------
 * - Use async methods for actions (async methodName() { ... })
 * - Include Allure logging for all actions (via utilities or BasePage)
 * - One action per method - keep methods focused
 * - Use descriptive method names that explain what the action does
 * - Return values when needed (e.g., getText(), isDisplayed())
 */

/**
 * TIMEOUT STRATEGY
 * ----------------
 * - Use TIMEOUTS constants for standard waits
 * - Override only when necessary (slow operations, quick checks)
 * - Document why custom timeouts are needed
 *
 * Standard timeouts:
 * - TIMEOUTS.ELEMENT_WAIT (5s) - Standard element waits
 * - TIMEOUTS.POPUP_WAIT (3s) - Popup and alert waits
 * - TIMEOUTS.PAGE_LOAD (10s) - Page load operations
 */

/**
 * ERROR HANDLING
 * --------------
 * - Let WebDriverIO errors propagate (don't catch element not found)
 * - Use try-catch only for expected failures or cleanup operations
 * - Provide clear error messages in custom validations
 */

/**
 * SINGLETON EXPORT
 * ----------------
 * - ALWAYS export page objects as singletons: export default new ClassName()
 * - This ensures single instance reuse across step definitions
 * - BasePage itself is NOT a singleton (to enable inheritance)
 * - Concrete page objects ARE singletons
 */

/**
 * TESTING CHECKLIST
 * -----------------
 * After creating a new page object:
 *
 * 1. ✅ Run feature tests to verify functionality
 * 2. ✅ Check Allure reports for steps and screenshots
 * 3. ✅ Test on both Android and iOS (if applicable)
 * 4. ✅ Verify timeout behavior is appropriate
 * 5. ✅ Ensure all methods have clear, descriptive names
 * 6. ✅ Confirm singleton export pattern is used
 */

/**
 * WHEN TO USE WHICH APPROACH
 * ---------------------------
 *
 * Use BasePage inheritance when:
 * ✅ Creating a brand new page object
 * ✅ Want automatic utility method availability
 * ✅ Prefer cleaner, more maintainable code
 * ✅ Standard patterns cover your needs
 *
 * Use direct utility imports when:
 * ✅ Migrating existing page objects gradually
 * ✅ Need fine-grained control over imports
 * ✅ Complex custom logic required
 * ✅ Want maximum flexibility
 *
 * See USAGE_GUIDELINES.md for detailed decision tree
 */
