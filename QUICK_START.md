# 🚀 Quick Start Guide - 5 Minutes to First Test

## Step 1: Verify Prerequisites (1 minute)

Check if Node.js is installed:
```bash
node --version
```

If not installed, download from: https://nodejs.org/ (LTS version recommended)

---

## Step 2: Install Dependencies (2 minutes)

Open terminal and run:

```bash
# Navigate to project
cd /Users/haveninfoline/Desktop/playwright_repo

# Install packages
npm install

# Install browsers
npx playwright install
```

---

## Step 3: Run Your First Test (1 minute)

```bash
# Run example tests in headed mode (you'll see the browser)
npx playwright test tests/examples/example.spec.js --headed
```

You should see:
- ✅ Browser opens automatically
- ✅ Test actions execute
- ✅ Results in terminal

---

## Step 4: View Test Report (1 minute)

```bash
# Generate and open HTML report
npx playwright show-report
```

This opens an interactive report in your browser showing:
- Test results
- Screenshots
- Videos (for failures)
- Traces

---

## 🎉 Congratulations! You've Run Your First Playwright Test

---

## What's Next?

### Option 1: Interactive UI Mode (Recommended for Learning)
```bash
npm run test:ui
```
- See tests as they run
- Time travel through test steps
- Debug visually

### Option 2: Run All Tests
```bash
npm test
```

### Option 3: Run Specific Test Types
```bash
npm run test:api      # API tests only
npm run test:ui-tests # UI tests only
npm run test:visual   # Visual tests only
```

### Option 4: Run in Specific Browser
```bash
npm run test:chrome   # Chrome
npm run test:firefox  # Firefox
npm run test:safari   # Safari
```

### Option 5: Debug Mode
```bash
npm run test:debug
```

---

## 📚 Learning Path

1. **Day 1-2**: Complete `tests/examples/example.spec.js` (6 tutorials)
2. **Day 3**: Study `tests/ui/login.spec.js` (Page Object Model)
3. **Day 4**: Explore `tests/api/users.api.spec.js` (API testing)
4. **Day 5**: Try `tests/visual/visual.spec.js` (Visual testing)

---

## 📖 Documentation

- **Full Tutorial**: See `TUTORIAL_GUIDE.md` (3-week program)
- **README**: See `README.md` (Complete documentation)
- **Official Docs**: https://playwright.dev/

---

## 🆘 Troubleshooting

### Issue: "Cannot find module '@playwright/test'"
**Solution**: Run `npm install`

### Issue: "Browsers not installed"
**Solution**: Run `npx playwright install`

### Issue: Tests fail
**Solution**: 
- Check internet connection (tests use demo sites)
- Try running in headed mode: `--headed`
- Use debug mode: `npm run test:debug`

### Issue: Port already in use
**Solution**: Close other applications using port 3000 or change port in config

---

## 🎓 Quick Commands Cheat Sheet

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI (interactive)
npm run test:ui

# Run specific test file
npx playwright test tests/examples/example.spec.js

# Run tests in Chrome only
npm run test:chrome

# Run tests in parallel
npm run test:parallel

# Debug tests
npm run test:debug

# View report
npm run report

# Generate new test
npx playwright codegen https://demo.playwright.dev
```

---

## 💡 Pro Tips

1. **Use UI Mode** for learning and debugging
2. **Use Codegen** to generate test code: `npx playwright codegen`
3. **Run in headed mode** when developing tests
4. **Use debug mode** when tests fail
5. **Check HTML report** for detailed results

---

## 📞 Get Help

- **Team Lead**: [Your Name]
- **Slack**: #qa-automation
- **Documentation**: See README.md and TUTORIAL_GUIDE.md

---

**Ready to become a Playwright expert? Start with Tutorial 1 in `tests/examples/example.spec.js`** 🚀
