import { test, expect } from '@playwright/test';

test.describe('Sign Up Page', () => {
    test('should create a new account successfully', async ({ page }) => {
        console.log('Navigating to the sign-up page...');
        await page.goto('https://localhost:5173/signup');

        console.log('Filling in the form with valid data...');
        await page.fill('input[name="name"]', 'John Doe');
        await page.fill('input[name="email"]', 'john.doe@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');
        await page.fill('input[name="registrationKey"]', '0430dba9-3777-4004-8f8a-875b6a32ca04'); // Replace with a valid key
        await page.fill('input[name="phoneNumber"]', '1234567890');
        await page.fill('input[name="address"]', '123 Main St');
        await page.fill('input[name="pickupAddress"]', '456 Pickup St');
        await page.fill('input[name="dateOfBirth"]', '1990-01-01'); // Adjust date as needed

        console.log('Submitting the form...');
        await page.click('button[type="submit"]');

        console.log('Waiting for navigation...');
        await expect(page).toHaveURL('https://localhost:5173/login'); // Ensure navigation to login page after successful sign-up
    });

    test('should show error message when passwords do not match', async ({ page }) => {
        console.log('Navigating to the sign-up page...');
        await page.goto('https://localhost:5173/signup');

        console.log('Filling in the form with mismatched passwords...');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password321');
        await page.fill('input[name="name"]', 'John Doe');
        await page.fill('input[name="email"]', 'john.doe@example.com');
        await page.fill('input[name="registrationKey"]', '19b72fcc-8fca-48ef-a6d9-2ef683bd9d01');
        await page.fill('input[name="phoneNumber"]', '1234567890');
        await page.fill('input[name="address"]', '123 Main St');
        await page.fill('input[name="pickupAddress"]', '456 Pickup St');
        await page.fill('input[name="dateOfBirth"]', '1990-01-01');

        console.log('Submitting the form...');
        await page.click('button[type="submit"]');

        console.log('Waiting for error message...');
        const errorMessageElement = await page.waitForSelector('p._error_1cnz2_145', { state: 'visible' });
        const errorMessage = await errorMessageElement.textContent();
        console.log('Verifying error message...');
        expect(errorMessage).toContain('Passwords do not match.');
    });

    test('should show error message for invalid registration key', async ({ page }) => {
        console.log('Navigating to the sign-up page...');
        await page.goto('https://localhost:5173/signup');

        console.log('Filling in the form with invalid registration key...');
        await page.fill('input[name="name"]', 'John Doe');
        await page.fill('input[name="email"]', 'john.doe@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');
        await page.fill('input[name="registrationKey"]', 'invalidRegistrationKey'); // Invalid registration key
        await page.fill('input[name="phoneNumber"]', '1234567890');
        await page.fill('input[name="address"]', '123 Main St');
        await page.fill('input[name="pickupAddress"]', '456 Pickup St');
        await page.fill('input[name="dateOfBirth"]', '1990-01-01');

        console.log('Submitting the form...');
        await page.click('button[type="submit"]');

        console.log('Waiting for error message...');
        const errorMessageElement = await page.waitForSelector('p._error_1cnz2_145', { state: 'visible' });
        const errorMessage = await errorMessageElement.textContent();
        console.log('Verifying error message for invalid registration key...');
        expect(errorMessage).toContain('Invalid or already used registration key.');
    });
});
