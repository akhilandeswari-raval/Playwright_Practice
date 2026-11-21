async function globalSetup() {
    // Perform any global setup tasks here, such as initializing databases, setting environment variables, etc.
    console.log('Global setup is running...');
    // Example: Set an environment variable
    process.env.GLOBAL_SETUP = 'true';
}
export default globalSetup;