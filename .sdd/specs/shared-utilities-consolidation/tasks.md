# Implementation Plan

## Overview
This plan breaks down the shared utilities consolidation feature into executable tasks that eliminate 95+ instances of code duplication across 5 page objects while maintaining backward compatibility.

## Task Breakdown

### Phase 1: Foundation - Utility Module Creation

- [x] 1. Create shared constants module
- [x] 1.1 (P) Define timeout configuration constants
  - Create named exports for element wait timeout (5000ms), popup wait timeout (3000ms), page load timeout (10000ms)
  - Add Cucumber step timeout reference value (60000ms) for documentation
  - Export using ES Module named exports syntax
  - _Requirements: 6.1, 6.2, 6.5, 6.6, 6.7_

- [x] 1.2 (P) Define platform-specific resource identifiers
  - Create Android resource ID constants for alert dialog message and buttons (positive, negative)
  - Create iOS selector constants for alert buttons (OK, Cancel)
  - Group constants by platform in separate exported objects
  - _Requirements: 6.3, 6.4, 6.7_

- [x] 2. Build platform selector utility module
- [x] 2.1 (P) Implement text-based selector creation
  - Build function that checks platform and returns Android UiSelector or iOS accessibility ID
  - Accept text string parameter and return WebDriverIO-compatible selector string
  - Add JSDoc comments with parameter types, return type, and usage example
  - _Requirements: 2.1, 2.2, 2.6, 8.1, 8.2_

- [x] 2.2 (P) Implement accessibility ID selector creation
  - Build function that creates platform-agnostic accessibility ID selectors
  - Return selector string usable with WebDriverIO element lookup
  - Document function with JSDoc including example code
  - _Requirements: 2.3, 2.6, 8.1, 8.2_

- [x] 2.3 (P) Implement resource ID and predicate selector creation
  - Build function accepting Android resource ID and iOS predicate string parameters
  - Return appropriate selector based on platform detection
  - Add combined text/description selector function for Android content-desc fallback
  - Include comprehensive JSDoc with both platform examples
  - _Requirements: 2.4, 2.5, 2.6, 8.1, 8.2_

- [x] 3. Enhance Allure reporting utility module
- [x] 3.1 (P) Add combined step logging and screenshot function
  - Build function that calls Allure addStep and captures screenshot in single operation
  - Accept step description parameter and optional configuration object
  - Handle screenshot failures gracefully with console warning (non-blocking)
  - Maintain compatibility with existing takeScreenshotAndAddToReport function
  - Document with JSDoc including error handling behavior
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.1, 8.2_

- [x] 3.2 (P) Add step-only logging function
  - Build function for Allure step reporting without screenshot capture
  - Provide lightweight alternative for non-visual test steps
  - Add JSDoc documentation with usage guidance
  - _Requirements: 3.1, 3.4, 8.1, 8.2_

- [x] 4. Build common UI interaction utility module
- [x] 4.1 (P) Implement button click with reporting
  - Build function that creates text selector, waits for element, performs click
  - Integrate Allure step logging and screenshot capture automatically
  - Accept button text and optional timeout configuration
  - Reference constants module for default timeout values
  - Document with JSDoc including timeout override example
  - _Requirements: 4.1, 4.2, 4.7, 8.1, 8.2_

- [x] 4.2 (P) Implement popup message retrieval
  - Build function that locates popup using platform-specific resource IDs from constants
  - Wait for popup display and extract text content
  - Include Allure reporting and screenshot capture
  - Handle both Android dialog and iOS alert patterns
  - Add JSDoc with platform-specific behavior notes
  - _Requirements: 4.3, 4.7, 8.1, 8.2_

- [x] 4.3 (P) Implement popup confirmation
  - Build function that clicks OK button using platform-specific selectors from constants
  - Integrate automatic Allure step logging and screenshot
  - Accept optional timeout configuration
  - Document expected popup types (Android dialog, iOS alert)
  - _Requirements: 4.4, 4.5, 4.7, 8.1, 8.2_

- [x] 4.4 (P) Implement input field value setter
  - Build function accepting accessibility ID and value parameters
  - Locate input element, set value, capture screenshot with Allure reporting
  - Use WebDriverIO setValue method with proper async handling
  - Add JSDoc with form field example
  - _Requirements: 4.6, 4.7, 8.1, 8.2_

- [x] 4.5 (P) Implement element visibility checker
  - Build function that waits for element and returns visibility state
  - Accept selector string and optional timeout configuration
  - Return boolean indicating element display status
  - Include error handling for element not found scenarios
  - _Requirements: 4.2, 8.1, 8.2_

### Phase 2: Abstraction Layer - BasePage Creation

- [x] 5. Create BasePage abstract class
- [x] 5.1 Implement BasePage class with utility integration
  - Create class that imports all utility modules (selector, action, reporting, constants)
  - Implement protected methods that wrap utility functions for subclass access
  - Add abstract open() method that throws error if not overridden
  - Export as class (not singleton) to enable inheritance
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.7, 10.3_

- [x] 5.2 Add selector utility methods to BasePage
  - Implement getTextSelector method wrapping selector utility
  - Implement getAccessibilitySelector method
  - Implement getResourceSelector method for platform-specific lookups
  - Mark methods as protected for subclass visibility
  - _Requirements: 5.2, 5.5, 8.3_

- [x] 5.3 Add action utility methods to BasePage
  - Implement clickButton method with automatic Allure integration
  - Implement setText method for input field interactions
  - Implement waitForElement method with timeout configuration
  - Implement getPopupMessage and confirmPopup methods
  - Ensure all methods include built-in screenshot and step reporting
  - _Requirements: 5.3, 5.4, 5.5, 8.3_

- [x] 5.4 Document BasePage with inheritance examples
  - Add class-level JSDoc explaining abstract class pattern
  - Include example showing page object extending BasePage
  - Document that subclasses remain singleton exports while BasePage is not
  - Add usage guidance for when to extend vs use utilities directly
  - _Requirements: 5.7, 8.3, 8.4, 8.6_

### Phase 3: Migration - Page Object Refactoring

- [x] 6. Refactor HomePage (simplest, 3 methods)
- [x] 6.1 Migrate HomePage to use utilities
  - Replace platform conditionals in getters with selector utility calls
  - Replace manual Allure and screenshot calls with utility functions
  - Maintain existing method signatures and return types
  - Keep singleton export pattern intact
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.1, 10.2, 10.5, 10.6_

- [ ] 6.2* Validate HomePage refactoring with feature tests
  - Run navigation.feature tests on Android emulator
  - Run navigation.feature tests on iOS simulator (if available)
  - Verify Allure report structure matches baseline
  - Confirm all tests pass without behavioral changes
  - _Requirements: 7.7, 9.1, 9.2, 9.3, 9.4, 9.5, 9.7_

- [x] 7. Refactor NavigationPage (4 methods)
- [x] 7.1 Migrate NavigationPage to use utilities
  - Replace platform conditionals with selector utility function calls
  - Update Allure integration to use combined utility functions
  - Preserve existing method behavior and signatures
  - Maintain singleton export
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.1, 10.2, 10.5, 10.6_

- [ ] 7.2* Validate NavigationPage refactoring
  - Execute navigation.feature tests on both platforms
  - Compare Allure reports to baseline for consistency
  - Verify screenshot capture functions correctly
  - _Requirements: 7.7, 9.1, 9.2, 9.4, 9.5, 9.7_

- [x] 8. Refactor LoginPage (6 methods)
- [x] 8.1 Migrate LoginPage to use utilities or extend BasePage
  - Choose migration strategy: direct utility imports OR BasePage inheritance
  - Replace all platform conditionals and manual Allure calls
  - Maintain method signatures for backward compatibility with step definitions
  - Keep singleton export pattern
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 10.1, 10.2, 10.3, 10.5, 10.6_

- [ ] 8.2* Validate LoginPage refactoring
  - Run login.feature tests on both Android and iOS
  - Verify success message popup handling works correctly
  - Check Allure report includes all steps and screenshots
  - _Requirements: 7.7, 9.1, 9.2, 9.4, 9.5, 9.7_

- [x] 9. Refactor SignUpPage (9 methods)
- [x] 9.1 Migrate SignUpPage to use utilities or extend BasePage
  - Apply chosen migration strategy consistently
  - Replace platform selectors, Allure calls, and screenshot captures
  - Preserve email generation logic and popup handling
  - Maintain singleton export and existing method contracts
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 10.1, 10.2, 10.3, 10.5, 10.6_

- [ ] 9.2* Validate SignUpPage refactoring
  - Execute signup.feature tests on both platforms
  - Verify positive and negative test scenarios both pass
  - Confirm error message retrieval uses utility correctly
  - Check Allure reports for complete step coverage
  - _Requirements: 7.7, 9.1, 9.2, 9.3, 9.4, 9.5, 9.7_

- [x] 10. Refactor FormsPage (most complex, 15 methods)
- [x] 10.1 Migrate FormsPage to use utilities or extend BasePage
  - Apply migration strategy to all 15 methods
  - Replace platform conditionals in dropdown, switch, and button interactions
  - Update complex form filling method to use utilities throughout
  - Preserve all form validation and popup handling logic
  - Maintain singleton export pattern
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 10.1, 10.2, 10.3, 10.5, 10.6_

- [ ] 10.2* Validate FormsPage refactoring
  - Run forms.feature tests on both Android and iOS
  - Verify JSON-driven form filling still works
  - Test dropdown selection, switch toggle, and button click utilities
  - Confirm popup message validation functions correctly
  - Validate Allure reports show all form interactions
  - _Requirements: 7.7, 9.1, 9.2, 9.3, 9.4, 9.5, 9.7_

### Phase 4: Validation and Documentation

- [ ] 11. Perform comprehensive validation
- [ ] 11.1 Execute full test suite regression check
  - Run all 4 feature files (login, signup, forms, navigation) on Android
  - Run all 4 feature files on iOS (if environment available)
  - Compare test execution time to baseline (target: ≤5% variance)
  - Verify 100% test pass rate maintained across all features
  - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [ ] 11.2 Validate Allure reporting integrity
  - Generate Allure reports for all test executions
  - Verify step descriptions match expected format
  - Confirm screenshots attached to all page actions
  - Compare report structure to pre-refactoring baseline
  - Check report artifact size (should be similar to baseline)
  - _Requirements: 9.4, 9.7_

- [ ] 11.3 Verify platform selector correctness
  - Inspect generated selectors for Android (UiSelector format validation)
  - Inspect generated selectors for iOS (accessibility ID and predicate string format)
  - Confirm platform detection logic works correctly on both platforms
  - Test fallback scenarios (description vs text for Android)
  - _Requirements: 2.5, 9.6_

- [x] 12. Create migration documentation and examples
- [x] 12.1 Add before/after code examples to utilities
  - Document old pattern (manual platform conditionals) vs new pattern (utility calls)
  - Show refactoring example for typical page object getter
  - Include example of method migration with Allure integration
  - Add to utility file comments or create separate example file
  - _Requirements: 8.4, 8.5_

- [x] 12.2 Document utility usage guidelines
  - Specify when to use utility functions vs BasePage inheritance
  - Provide decision tree for migration strategy selection
  - Document when custom implementations are preferred over utilities
  - Include guidance on timeout configuration and override patterns
  - _Requirements: 8.4, 8.6, 8.7, 10.4_

- [x] 12.3 Create new page object template
  - Build template showing modern page object using BasePage inheritance
  - Include all utility method usage examples
  - Document import patterns and singleton export
  - Add template to project repository for future reference
  - _Requirements: 8.4, 10.4_

---

## Requirements Coverage Summary

All requirements mapped to implementation tasks:

- **Requirement 1**: Analysis performed during design phase (documented in research.md)
- **Requirement 2**: Tasks 2.1-2.3 (Platform selector utility creation)
- **Requirement 3**: Tasks 3.1-3.2 (Allure reporting utility enhancement)
- **Requirement 4**: Tasks 4.1-4.5 (UI interaction utility creation)
- **Requirement 5**: Tasks 5.1-5.4 (BasePage class implementation)
- **Requirement 6**: Tasks 1.1-1.2 (Constants module creation)
- **Requirement 7**: Tasks 6.1, 7.1, 8.1, 9.1, 10.1 (Page object refactoring)
- **Requirement 8**: Covered throughout (JSDoc in all utility tasks, templates in 12.1-12.3)
- **Requirement 9**: Tasks 6.2, 7.2, 8.2, 9.2, 10.2, 11.1-11.3 (Testing and validation)
- **Requirement 10**: Supported by hybrid architecture and incremental migration approach

---

_generated_at: 2026-02-04T17:00:00Z_
_language: en_
