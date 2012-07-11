module.exports = (function() {
  var args = []

  return {
    push: function(arg) {
      args.push(arg)
    },
    add: function(callback) {
      try {
        var result = 0
        for (var i=0; i<args.length; i++) result+=args[i]
        callback(null, result)
      } catch (err) {
        callback(err)
      }
    }
  }
})()
