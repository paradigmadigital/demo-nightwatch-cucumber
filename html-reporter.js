const reporter = require('cucumber-html-reporter')
const pkg = require('./package.json')
let metadata

try {
  metadata = require('./reports/metadata.json')
} catch (err) {
  // Si da error es porque no existe el fichero json
  console.error('[ERROR] Execute "npm run test" after generating HTML report\n')
  // Forzamos la salida con error
  process.exit(1)
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber.json',
  output: 'reports/cucumber.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    'App Version': pkg.version,
    'Browser': metadata.browser,
    'Test Environment': metadata.environment,
    'Platform': metadata.platform,
    'Execution Mode': metadata.executionMode
  }
}

reporter.generate(options)
