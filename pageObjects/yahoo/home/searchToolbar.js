const myCommands = {
  waitForPageLoaded: function (timeout) {
    const myTimeout = timeout || this.api.globals.timeout.medium
    return this
      .waitForElementVisible('@searchBar', myTimeout)
      .waitForElementVisible('@submit', myTimeout)
  }
}

module.exports = {
  commands: [myCommands],
  url: 'https://es.search.yahoo.com/',
  elements: {
    searchBar: {
      selector: 'input[type=text]'
    },
    submit: {
      selector: '//*[@title="Search"]',
      locateStrategy: 'xpath'
    }
  }
}
