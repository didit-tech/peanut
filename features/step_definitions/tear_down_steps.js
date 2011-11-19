var _ = require('underscore')._;

Then(/^it should have a a Teardown$/, function(step) {
  this.feature.should.have.property('teardown');
  step.done();
});

Then(/^the Teardown should have the following Steps:$/,
  function(step, stepNames) {
    var steps = this.teardown.steps;
    _(stepNames.hashes()).each(function(step, i) {
      step['Name'].should.eql(steps[i][0] + ' ' + steps[i][2]);
    });
    step.done();
  });