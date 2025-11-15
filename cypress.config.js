import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents() {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    env: {
      API_BASE_URL: "http://localhost:3000/api",
      LOGIN_ENDPOINT: "/auth/login",
      LOGOUT_ENDPOINT: "/auth/logout",
    },
  },
});
