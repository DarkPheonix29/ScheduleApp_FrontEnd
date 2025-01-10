module.exports = {
    testDir: './test', // Adjust if your tests are in a different directory
    outputDir: './test-results', // Optional: Where to save test results (screenshots, videos)
    timeout: 60000, // Adjust the default timeout for tests in milliseconds
    workers: 1, // Adjust the number of parallel test processes to run
    reporter: [
        ['list'], // Output test results to the console
        // Add other reporters like 'html' or 'json' for detailed reports
    ],
};