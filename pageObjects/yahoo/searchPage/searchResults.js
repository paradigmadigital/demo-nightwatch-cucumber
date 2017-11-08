const myCommands = {
  waitForPageLoaded: function (timeout) {
    const myTimeout = timeout || this.api.globals.timeout.medium
    return this
      .waitForElementVisible('@results', myTimeout)
  },

  clickOnResult: function (position) {
    //return this.click('@results')
    return this.clickElementOnList('@results', position)
  }
}

module.exports = {
  commands: [myCommands],
  elements: {
    results: '#web > ol>li .title a'
  }
}
