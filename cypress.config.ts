import { defineConfig } from 'cypress';
import * as fs from 'fs';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/task.html',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/integration/**/*.spec.ts',
    supportFile: 'cypress/support/index.ts',
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    env: {
      easygeneratorUrl: 'https://easygenerator.com'
    },
    setupNodeEvents(on, config) {
      on('task', {
        readFile(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8');
          }

          return null;
        }
      });
    }
  }
});
