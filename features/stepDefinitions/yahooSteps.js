const {client} = require('nightwatch-cucumber')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
  Given(/^que he navegado a la pagina del buscador de Yahoo$/, () => {
    const yahooSearch = client.page.yahoo.home.searchToolbar()
    return yahooSearch
      .navigate()
      .waitForPageLoaded()
  })

  Given(/^que he realizado una busqueda de texto con "([^"]*)"$/, (text) => {
    const yahooSearch = client.page.yahoo.home.searchToolbar()
    return yahooSearch
      .navigate()
      .waitForPageLoaded()
      .setValue('@searchBar', text)
      .verify.hasFocus('@searchBar')
      .assert.visible('@submit')
      .click('@submit')
  })

  When(/^realizo una busqueda de texto con "([^"]*)"$/, (text) => {
    const yahooSearch = client.page.yahoo.home.searchToolbar()
    return yahooSearch
      .setValue('@searchBar', text)
      .verify.hasFocus('@searchBar')
      .assert.visible('@submit')
      .click('@submit')
  })

  When(/^navego a la siguiente pagina de resultados$/, () => {
    const yahooPagination = client.page.yahoo.searchPage.pagination()
    return yahooPagination
      .waitForPageLoaded()
      .click('@nextPage')
  })

  When(/^hago click sobre el resultado (\d)$/, (position) => {
    const yahooResults = client.page.yahoo.searchPage.searchResults()
    return yahooResults
      .waitForPageLoaded(client.globals.timeout.short)
      .clickOnResult(position)
  })

  Then(/^el titulo de la pagina es "([^"]*)"$/, (title) => {
    return client.assert.title(!title)
  })

  Then(/^puedo ver el campo de texto para realizar la busqueda$/, () => {
    const yahooSearch = client.page.yahoo.home.searchToolbar()
    return yahooSearch.assert.visible('@searchBar')
  })

  Then(/^se cargan los resultados$/, () => {
    const timeout = client.globals.timeout.long
    const yahooResults = client.page.yahoo.searchPage.searchResults()
    return yahooResults.waitForPageLoaded(timeout)
  })

  Then(/^el titulo de la pagina contiene el texto "([^"]*)"$/, (text) => {
    return client.getTitle((title) => {
      client.assert.ok(title.includes(text))
    })
  })

  Then(/^navego a la pagina que he seleccionado$/, () => {
    // El buscador de yahoo abre una nueva pestaña al hacer click
    // por eso hay que cambiar el foco a la pestaña nueva
    client.window_handles((result) => {
      const handle = result.value[1]
      client.switchWindow(handle)
    })

    // Aseguramos que el titulo de la pestaña no contiene la cadena "Yahoo"
    //
    // Nota: si conociesemos cual es la pagina del listado de resultados
    // (y su posicion no cambiara) habria que verificarlo de otro modo,
    // por ejemplo, buscando un elemento que sepamos que existe en la pagina
    client.getTitle((title) => {
      // Como ya tenemos el titulo, podemos cerrar la pestaña
      client.closeWindow()
      // Comprobamos que el titulo no contenga "Yahoo"
      client.assert.ok(!title.includes('Yahoo'))
    })

    // Nos movemos de nuevo a la pestaña inicial (0 = primera posicion)
    return client.window_handles((result) => {
      const handle = result.value[0]
      client.switchWindow(handle)
    })
  })

})
