const myCommands = {
  waitForPageLoaded: function (timeout) {
    var myTimeout = timeout || this.api.globals.timeout.medium
    return this
      .waitForElementVisible('@nextPage', myTimeout)
  }
}

module.exports = {
  commands: [myCommands],
  elements: {
    nextPage: '.pagination .next'
  }
}
