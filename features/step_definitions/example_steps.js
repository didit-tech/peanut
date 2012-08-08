var assert = require('assert')
var calculator = require('../support/calculator')

Given(/^I have entered (\d*\.)?(\d+) into the calculator$/, function(step, arg) {
  calculator.push(parseInt(arg))
  step.done()
})

When(/^I press add$/, function(step) {
  var self = this
  calculator.add(function(err, sum) {
    self.sum = sum
    step.done()
  })
})

Then(/^the result should be (\d*\.)?(\d+) on the screen$/, function(step, arg) {
  var self = this
  self.sum.should.eql(arg)
  step.done()
})
