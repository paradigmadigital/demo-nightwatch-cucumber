const chromedriver = require('chromedriver')
const seleniumserver = require('selenium-server')

require('nightwatch-cucumber')({
  nightwatchOutput: false,
  cucumberArgs: [
    '--require', 'features/stepDefinitions',
    '--require', 'hooks.js',
    '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:reports/cucumber.json',
    'features'
  ]
})

module.exports = {
  output_folder: 'reports',
  custom_commands_path: 'commands',
  custom_assertions_path: 'asserts',
  page_objects_path: 'pageObjects',
  globals_path: 'globals/myGlobals.js',

  selenium: {
    start_process: true,
    server_path: seleniumserver.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path
    }
  },

  test_settings: {
    default: {
      launch_url: '',
      selenium_host: '127.0.0.1',
      selenium_port: 4444,
      silent: true,
      end_session_on_fail: true,
      skip_testcases_on_fail: true,
      request_timeout_options: {
        timeout: 5000,
        retry_attempts: 2
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots'
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--disable-popup-blocking', '--no-sandbox']
        }
      }
    }
  }
}
