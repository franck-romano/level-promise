"use strict";
var Promise = require('promise')

exports = module.exports = substitute

function substitute(db, methodName, method) {
  if (typeof method !== 'function') return
  db[methodName] = _wrap(method, Promise.denodeify(method))
}

function _wrap(method, methodP) {
  return function() {
    var lastArgument = arguments[arguments.length - 1]
    if (typeof lastArgument == 'function')
      method.apply(this, arguments)
    else
      return methodP.apply(this, arguments)
  }
}
