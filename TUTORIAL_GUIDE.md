# Playwright Automation Framework - Step-by-Step Tutorial Guide

## 📘 Complete Tutorial for QA Team

This guide will take you from zero to hero in Playwright automation testing. Follow each tutorial in sequence.

---

## 🎓 Tutorial Path

### Week 1: Fundamentals (Days 1-5)

#### Day 1: Setup & First Test (2 hours)
**Objective**: Get Playwright running and understand basic test structure

**Steps**:
1. Install Node.js from https://nodejs.org/
2. Open terminal and navigate to project:
   ```bash
   cd /Users/haveninfoline/Desktop/playwright_repo
   ```
3. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```
4. Run your first test:
   ```bash
   npx playwright test tests/examples/example.spec.js --headed
   ```
5. Observe the browser automation in action

**Practice Exercise**:
- Modify Tutorial 1.1 to visit a different website
- Add more assertions
- Take screenshots at different steps

**Expected Outcome**: You can run tests and see automated browser actions

---

#### Day 2: Locators & Interactions (3 hours)
**Objective**: Learn to find and interact with web elements

**Key Concepts**:
- CSS Selectors: `.class`, `#id`, `tag`
- Text Selectors: `:has-text("Login")`, `"Exact Text"`
- Actions: `click()`, `fill()`, `press()`, `hover()`

**Exercises**:
1. Complete Tutorial 1.2 - 1.5 from example.spec.js
2. Practice with TodoMVC:
   - Add 5 different todos
   - Mark 2 as complete
   - Delete 1 todo
   - Verify remaining count

**Common Selectors Reference**:
```javascript
// By ID
page.locator('#username')

// By class
page.locator('.button-primary')

// By text
page.locator('button:has-text("Submit")')

// By attribute
page.locator('input[type="email"]')

// By role
page.getByRole('button', { name: 'Login' })
```

**Expected Outcome**: Confidence in finding and interacting with elements

---

#### Day 3: Assertions & Waits (2 hours)
**Objective**: Verify test conditions and handle timing

**Key Concepts**:
- Assertions: `toBeVisible()`, `toHaveText()`, `toHaveURL()`
- Auto-waiting: Playwright waits automatically
- Custom waits: `waitForSelector()`, `waitForURL()`

**Exercises**:
1. Complete Tutorial 1.6 (Various assertions)
2. Write tests that verify:
   - Element visibility
   - Text content
   - URL changes
   - Element attributes

**Common Assertions**:
```javascript
// Visibility
await expect(page.locator('.welcome')).toBeVisible()

// Text
await expect(page.locator('h1')).toHaveText('Welcome')

// URL
await expect(page).toHaveURL(/dashboard/)

// Count
await expect(page.locator('.item')).toHaveCount(5)

// Attribute
await expect(page.locator('input')).toHaveAttribute('type', 'email')
```

**Expected Outcome**: Write tests with proper validations

---

#### Day 4: Page Object Model (3 hours)
**Objective**: Organize tests for better maintenance

**Key Concepts**:
- Separation of concerns
- Reusable page classes
- Maintainable test code

**Exercises**:
1. Study `pages/LoginPage.js`, `pages/HomePage.js`
2. Complete `tests/ui/login.spec.js` tutorials
3. Create your own page object for a new page

**Page Object Template**:
```javascript
class MyPage {
  constructor(page) {
    this.page = page;
    // Define locators
    this.element = page.locator('.selector');
  }
  
  async performAction() {
    // Define actions
    await this.element.click();
  }
  
  async verifyState() {
    // Define verifications
    return await this.element.isVisible();
  }
}
```

**Expected Outcome**: Understand and create page objects

---

#### Day 5: Practice & Review (3 hours)
**Objective**: Consolidate Week 1 learning

**Tasks**:
1. Review all Week 1 tutorials
2. Write 3 complete test scenarios end-to-end:
   - Test 1: Login flow
   - Test 2: Form submission
   - Test 3: Navigation flow
3. Create page objects for your tests
4. Run tests in headless mode
5. Fix any failing tests

**Self-Assessment Checklist**:
- [ ] Can write basic tests independently
- [ ] Understand locator strategies
- [ ] Can use assertions properly
- [ ] Comfortable with page objects
- [ ] Tests run successfully

---

### Week 2: Advanced Features (Days 6-10)

#### Day 6: API Testing (3 hours)
**Objective**: Test REST APIs with Playwright

**Key Concepts**:
- HTTP methods: GET, POST, PUT, DELETE
- Request context
- Response validation
- Status codes

**Exercises**:
1. Complete `tests/api/users.api.spec.js` (Tutorials 4.1-4.16)
2. Practice with JSONPlaceholder API
3. Write API tests for:
   - Creating a resource
   - Updating a resource
   - Deleting a resource
   - Error handling

**API Test Template**:
```javascript
test('API Test', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.length).toBeGreaterThan(0);
});
```

**Expected Outcome**: Independently write API tests

---

#### Day 7: Visual Regression Testing (2 hours)
**Objective**: Detect visual changes automatically

**Key Concepts**:
- Screenshot comparison
- Baseline images
- Pixel differences
- Masked areas

**Exercises**:
1. Complete `tests/visual/visual.spec.js` (Tutorials 5.1-5.15)
2. First run creates baselines
3. Second run compares against baselines
4. Intentionally change something and observe failure

**Visual Test Template**:
```javascript
test('Visual test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveScreenshot('page-name.png');
});
```

**Expected Outcome**: Use visual regression testing

---

#### Day 8: Authentication & Session Reuse (2 hours)
**Objective**: Optimize test execution with saved auth

**Key Concepts**:
- Login once, reuse everywhere
- Storage state
- Session persistence

**Exercises**:
1. Study `tests/setup/auth.setup.js`
2. Create authentication setup
3. Reuse auth in multiple tests
4. Understand project dependencies in config

**Auth Pattern**:
```javascript
// Setup file
await page.context().storageState({ path: 'auth.json' });

// Test file
test.use({ storageState: 'auth.json' });
```

**Expected Outcome**: Efficient test execution with auth

---

#### Day 9: Mobile & Cross-Browser Testing (3 hours)
**Objective**: Test across devices and browsers

**Key Concepts**:
- Device emulation
- Mobile viewports
- Browser projects
- Responsive testing

**Exercises**:
1. Run tests on different browsers:
   ```bash
   npm run test:chrome
   npm run test:firefox
   npm run test:safari
   ```
2. Test mobile viewports:
   ```bash
   npm run test:mobile
   ```
3. Study visual tests for different viewports

**Device Emulation**:
```javascript
const { devices } = require('@playwright/test');

test.use({
  ...devices['iPhone 12']
});
```

**Expected Outcome**: Multi-browser and mobile testing skills

---

#### Day 10: Debugging & Reporting (2 hours)
**Objective**: Debug failures and interpret reports

**Debugging Tools**:
1. **Headed Mode**: See what's happening
   ```bash
   npx playwright test --headed
   ```

2. **Debug Mode**: Step through tests
   ```bash
   npm run test:debug
   ```

3. **UI Mode**: Interactive testing
   ```bash
   npm run test:ui
   ```

4. **Trace Viewer**: Analyze failures
   ```bash
   npx playwright show-trace trace.zip
   ```

5. **HTML Report**: View results
   ```bash
   npm run report
   ```

**Exercises**:
1. Make a test fail intentionally
2. Debug using each tool
3. View HTML report
4. Analyze trace file
5. Fix the issue

**Expected Outcome**: Confident debugging skills

---

### Week 3: Real-World Application (Days 11-15)

#### Day 11-12: Identify Critical User Flows (4 hours)
**Objective**: Map out test scenarios for your application

**Activities**:
1. List 10 critical user journeys in your app
2. Prioritize based on:
   - Business impact
   - Frequency of use
   - Risk of failure
3. Document test scenarios

**Scenario Template**:
```
Test: User Login Flow
Priority: High
Steps:
  1. Navigate to login page
  2. Enter valid credentials
  3. Click login
  4. Verify dashboard loads
  5. Verify user name displays
Expected: User successfully logged in
```

**Deliverable**: Documented test scenarios

---

#### Day 13-14: Implement Test Cases (6 hours)
**Objective**: Convert scenarios to automated tests

**Activities**:
1. Create page objects for your app pages
2. Write tests for top 5 priority scenarios
3. Use data-driven approach where applicable
4. Add proper assertions and waits

**Best Practices**:
- One test = One scenario
- Clear test names
- Independent tests
- Proper assertions
- Clean up test data

**Deliverable**: 5 automated test scenarios

---

#### Day 15: CI/CD Integration & Review (3 hours)
**Objective**: Set up continuous testing

**Activities**:
1. Review `.github/workflows/playwright.yml`
2. Push code to GitHub
3. Verify tests run in CI
4. Set up Slack/email notifications
5. Review test coverage

**CI Configuration Example**:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm test
```

**Expected Outcome**: Tests running in CI/CD

---

## 🎯 Success Metrics Tracking

Track your progress:

| Metric | Week 1 | Week 2 | Week 3 | Target |
|--------|--------|--------|--------|--------|
| Tests Written | 5 | 15 | 25 | 50+ |
| Pass Rate | 80% | 85% | 90% | 95% |
| Coverage | 10% | 25% | 40% | 60% |
| Time Saved | - | 2 hrs | 5 hrs | 20 hrs |

---

## 📝 Daily Learning Log Template

```
Date: ___________
Tutorial Completed: ___________
Time Spent: ___________
Key Learnings:
- 
- 
- 

Challenges Faced:
- 
- 

Questions:
- 
- 

Tomorrow's Goal:
- 
```

---

## 🆘 Common Issues & Solutions

### Issue 1: Tests are flaky
**Solution**: Add proper waits, use auto-waiting assertions

### Issue 2: Can't find element
**Solution**: Use Playwright Inspector (`npx playwright test --debug`)

### Issue 3: Tests are slow
**Solution**: Run in parallel, use authentication setup

### Issue 4: Screenshots don't match
**Solution**: Disable animations, use consistent viewport

### Issue 5: CI tests fail but local pass
**Solution**: Check environment differences, use same browser versions

---

## 📚 Additional Resources

### Official Resources
- [Playwright Documentation](https://playwright.dev/)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

### Video Tutorials
- [Playwright YouTube Channel](https://www.youtube.com/@Playwrightweb)
- [Test Automation University](https://testautomationu.applitools.com/)

### Community
- [Playwright Slack](https://aka.ms/playwright-slack)
- [GitHub Discussions](https://github.com/microsoft/playwright/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)

---

## ✅ Certification Checklist

Complete these milestones:

### Level 1: Beginner (Week 1)
- [ ] Set up Playwright successfully
- [ ] Write 5 basic UI tests
- [ ] Use Page Object Model
- [ ] Run tests in multiple browsers
- [ ] Generate and view HTML reports

### Level 2: Intermediate (Week 2)
- [ ] Write 5 API tests
- [ ] Implement visual regression tests
- [ ] Use authentication setup
- [ ] Test on mobile viewports
- [ ] Debug failing tests effectively

### Level 3: Advanced (Week 3)
- [ ] Automate 5 critical user flows
- [ ] Implement CI/CD pipeline
- [ ] Achieve 40% test coverage
- [ ] Mentor a team member
- [ ] Present framework to team

---

## 🎓 Final Assessment

After completing all tutorials, you should be able to:

1. ✅ Write automated tests independently
2. ✅ Use Page Object Model effectively
3. ✅ Test APIs with Playwright
4. ✅ Implement visual regression testing
5. ✅ Debug and fix failing tests
6. ✅ Run tests in CI/CD
7. ✅ Test across browsers and devices
8. ✅ Analyze test reports
9. ✅ Follow best practices
10. ✅ Train others on the framework

**Congratulations on completing the Playwright Automation Framework Tutorial!** 🎉

---

**Need Help?**
- Team Lead: [Name]
- Slack: #qa-automation
- Email: qa-team@company.com

**Last Updated**: 10 December 2025
