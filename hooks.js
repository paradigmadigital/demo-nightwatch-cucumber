const {defineSupportCode} = require('cucumber')
const {client} = require('nightwatch-cucumber')
const fs = require('fs')

defineSupportCode(({Before, AfterAll}) => {

  /**
   * Se ejecuta al inicio de cada scenario para maximizar la ventana del navegador
   */
  Before(() => {
    // Como en nightwatch.conf.js tenemos launch_url = '', hay que pasar una
    // url (como por ejemplo http://localhost), aunque esta no sea correcta
    client
      .init('http://localhost')
      .maximizeWindow()
  })

  /**
   * Se ejecuta al final de todas las features para guardar la info para el reporte html
   */
  AfterAll(() => {
    console.log('AfterAll start')
    const metadata = {
      browser: client.globals.test_settings.report_prefix.replace(/_/g, ' '),
      environment: client.launch_url,
      platform: client.options.desiredCapabilities.platform,
      executionMode: client.globals.test_settings.parallelMode ? 'parallel' : 'sequential'
    }
    fs.writeFile('reports/metadata.json', JSON.stringify(metadata), (err) => {
      if (err) throw err
      console.log('The metadata file has been saved!')
    })
  })
})
