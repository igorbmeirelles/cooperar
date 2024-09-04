import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  env: {
    DATA_CY_LOGIN_EMAIL: "elf@galadriel.test",
    DATA_CY_LOGIN_PASSWORD: "cytestenvironment",
  },
});
