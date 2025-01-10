import { test, expect } from '@playwright/test';

test('Login with valid credentials and redirect', async ({ page }) => {
    console.log('Navigating to login page...');
    await page.goto('https://localhost:5173/login');

    // Fill in the login form
    console.log('Filling in email...');
    await page.fill('#email', 'testuser@example.com');
    console.log('Filling in password...');
    await page.fill('#password', 'password123');

    // Click the login button
    console.log('Clicking login button...');
    const [response] = await Promise.all([
        page.waitForURL('https://localhost:5173/login'), // Replace with the expected URL
        page.click('button[type="submit"]'),
    ]);

    console.log('Navigation complete.');
});


test('Login with non-existent user account', async ({ page }) => {
    console.log('Navigating to login page...');
    await page.goto('https://localhost:5173/login'); // Adjust the URL if needed

    // Fill in the login form with a non-existent email
    console.log('Filling in email...');
    await page.fill('#email', 'unknownuser@example.com');
    console.log('Filling in password...');
    await page.fill('#password', 'anypassword');

    // Click the login button
    console.log('Clicking login button...');
    await page.click('button[type="submit"]');

    // Wait for error message to appear
    console.log('Waiting for error message...');
    const errorMessageElement = await page.waitForSelector('#errorMessage', { state: 'visible' });

    // Assert that the error message is displayed and contains the expected text
    const errorMessage = await errorMessageElement.textContent();
    console.log('Verifying error message...');
    expect(errorMessage).toContain('No account found with this email.');
});
