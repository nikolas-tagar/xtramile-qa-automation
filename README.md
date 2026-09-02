# Xtramile QA Automation

Playwright automation test project for [SauceDemo](https://www.saucedemo.com), created as part of the Xtramile Solutions QA Automation technical assignment.

## Overview

This project implements automated UI testing using **Playwright with TypeScript** and follows the **Page Object Model (POM)** design pattern.

The test suite covers the main SauceDemo user journey, including login, product and cart management, checkout, and logout.

## Tech Stack

* **Language:** TypeScript
* **Test Framework:** Playwright Test
* **Design Pattern:** Page Object Model (POM)
* **Test Data:** TypeScript data files
* **Reporting:** Playwright HTML Report
* **CI/CD:** GitHub Actions
* **Browser:** Chromium

## Test Coverage

The automation suite currently contains **11 test cases** covering:

| Area          | Test Coverage                          |
| ------------- | -------------------------------------- |
| Login         | Valid credentials                      |
| Login         | Invalid username                       |
| Login         | Invalid password                       |
| Shopping Cart | Add item and verify cart badge         |
| Shopping Cart | Add multiple items and verify badge    |
| Shopping Cart | Remove item from cart                  |
| Shopping Cart | Verify all added items are displayed   |
| Shopping Cart | Remove one item while keeping another  |
| Checkout      | Complete checkout successfully         |
| Checkout      | Validate required checkout information |
| Logout        | Logout successfully                    |

## Framework Design

### Page Object Model

The application pages are separated into dedicated Page Object classes:

* `LoginPage` — Login functionality and login validation
* `InventoryPage` — Product and cart interactions
* `CartPage` — Cart item management and checkout navigation
* `CheckoutPage` — Customer information and order completion

This keeps test cases focused on **business scenarios** while page-specific locators and actions remain inside the Page Object classes.

### Custom Fixtures

A custom Playwright fixture is used to provide reusable Page Objects and an authenticated session.

The `authenticated` fixture:

1. Opens SauceDemo
2. Logs in using the standard user
3. Verifies that the inventory page is displayed
4. Makes the authenticated state available to the test

This avoids repeating the login flow in every test.

### Data-Driven Testing

Login scenarios are stored separately in:

`test-data/login-data.ts`

The test suite uses the same test logic for multiple login scenarios:

* Valid credentials
* Invalid username
* Invalid password

Checkout information is also separated into:

`test-data/users.ts`

## Project Structure

```text
xtramile-qa-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── test.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── test-data/
│   ├── users.ts
│   └── login-data.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── logout.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Make sure the following are installed:

* Node.js 20 or later
* npm
* Git

Verify the installation:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Install the required Playwright browser:

```bash
npx playwright install chromium
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests with browser visible

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Open the HTML report

```bash
npm run report
```

## Test Configuration

The Playwright configuration includes:

* **Parallel execution** using `fullyParallel`
* **Chromium** browser project
* **HTML reporting**
* **Screenshot on failure**
* **Trace retention on failure**
* **Video retention on failure**
* **Automatic retries in CI**
* **Base URL configuration for SauceDemo**

The application base URL is configured as:

```text
https://www.saucedemo.com
```

## Reporting and Debugging

Playwright HTML reports are generated after the test execution.

For failed tests, the configuration also captures:

* Screenshot
* Trace
* Video

These artifacts help investigate failures and reproduce unexpected behavior.

The generated report can be opened using:

```bash
npm run report
```

## CI/CD

The project includes a GitHub Actions workflow:

```text
.github/workflows/playwright.yml
```

The workflow runs automatically when code is:

* Pushed to the `main` branch
* Submitted through a Pull Request targeting the `main` branch

The CI pipeline performs the following steps:

1. Checkout repository
2. Setup Node.js
3. Install dependencies using `npm ci`
4. Install Playwright Chromium
5. Run the automated test suite
6. Upload Playwright HTML reports
7. Upload test results

## Test Strategy

The test suite focuses on the application's primary user flows and includes both positive and selected negative scenarios.

### Positive Scenarios

* Successful login
* Adding products to cart
* Removing products from cart
* Viewing cart contents
* Successful checkout
* Successful logout

### Negative / Validation Scenarios

* Invalid username
* Invalid password
* Checkout with missing required information

## Checkout Data Note

The assignment requires customer information including name and address.

SauceDemo's checkout form provides the following fields:

* First Name
* Last Name
* Postal Code

There is no separate address field available in the SauceDemo application. Therefore, the automation uses the available **Postal Code** field as part of the checkout customer information flow.

## Locator Strategy

The test framework primarily uses stable application locators such as:

* `data-test` attributes
* Stable element IDs
* Page-specific selectors

Examples include:

```text
[data-test="username"]
[data-test="password"]
[data-test="login-button"]
[data-test="shopping-cart-link"]
[data-test="checkout"]
[data-test="finish"]
```

This approach helps reduce dependency on presentation-oriented selectors such as CSS classes that may change with UI styling.

## Current Test Result

The current test suite contains:

**11 automated tests — 11 passed**

The tests are designed to be independently executable, with authentication handled through the reusable Playwright fixture where required.