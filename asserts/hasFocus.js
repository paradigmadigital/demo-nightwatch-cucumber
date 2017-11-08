const util = require('util')

exports.assertion = function (selector, msg) {
  const ancestors = selector

  // Si el selector viene desde una sección del page object
  // entonces será un array de objetos que comienzan desde 
  // su primer ancestro (sección), y termina con un elemento.
  if (typeof ancestors !== 'string') {
    selector = ''

    do {
      let oElement = ancestors.shift()
    }
    while (oElement !== undefined)
    {
      selector += ' ' + oElement.selector
      oElement = ancestors.shift()
    }
  }

  this.message = msg || util.format('Testing if element <%s> has focus', selector)
  this.expected = true

  this.pass = function (value) {
    return value === this.expected
  }

  this.value = function (result) {
    return result.value
  }

  this.command = function (callback) {
    this.api.execute(function (selector) {
      return document.activeElement === document.querySelector(selector)
    }, [selector], callback)
  }

}
