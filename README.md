# 🐶 Smartdog AI Localization Framework (Playwright + TypeScript)

A production-ready, highly extensible end-to-end (E2E) and REST API test automation framework built for **Smartdog's AI-native content localization platform**.

---

## 🎯 Key Architectural Highlights

- **Page Object Model (POM) & Custom Fixtures**: Complete separation of page locators, assertions, and application state.
- **Resilient Locators (`data-testid`)**: Test suite utilizes custom `st-` data test IDs for robust UI element selection.
- **Network Intercepting & Dynamic AI Mocking**: Simulates AI translation server responses, latency, and 500 error Fallback Workflows using Playwright's `page.route()`.
- **Typed REST API Integration**: Fully typed API client with custom SLA response-time monitoring and error handling.
- **CI/CD & Automated HTML Reporting**: Automated test pipeline configured via GitHub Actions with HTML artifact publishing.

---

## 🏗️ Repository Architecture

```smartdog-playwright-framework/
├── app/             
│   └── index.html
├── src/
│   ├── api/
│   ├── fixtures/
│   └── pages/
├── tests/
│   └── e2e/
├── .github/
├── playwright.config.ts
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Installation
1. Clone the repository:
```bash git clone https://github.com/petarfemic/smartdog-playwright-framework.git cd smartdog-playwright-framework``` 
2. Install dependencies:
```bash npm install``` 
3. Install Playwright browser binaries:
```bash npx playwright install --with-deps```

---

## 🧪 Executing Tests

```
# Run all tests (API & E2E UI)
npm run test

# Run only REST API test suite
npm run test:api

# Run E2E UI tests in headed mode
npm run test:headed

# Launch Playwright Interactive UI Mode
npm run test:ui

# Generate & Open Test HTML Report
npm run report
```

---

## 📊 Live CI/CD Test Report

Every commit triggers automated execution via **GitHub Actions**.

🔗 **View Live HTML Test Report**: [Smartdog Playwright Test Report](https://petarfemic.github.io/smartdog-playwright-framework)

---

## 👨‍💻 Author
**Petar Femić** - QA Automation Engineer  
ISTQB Certified | 3.5+ Years Experience in Automation Framework Architecture  
[LinkedIn Profile](https://linkedin.com/in/petarfemic) | [GitHub Portfolio](https://github.com/petarfemic)
