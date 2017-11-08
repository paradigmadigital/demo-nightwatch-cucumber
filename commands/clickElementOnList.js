exports.command = function (selector, child, callback) {

  // Para un childNumber incorrecto, se considera el primer elemento
  const childNumber = (child && child > 0) ? child : 0

  this.execute(function (selector, childNumber) {
    console.log('mi selector es ' + selector)
    document.querySelectorAll(selector)[childNumber].scrollIntoView()
    return document.querySelectorAll(selector)[childNumber].click()
  }, [selector, childNumber], callback)

  return this
}
