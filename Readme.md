
# peanut

  node.js cucumber implementation for the birds

  npm install peanut -g

# quickstart

#### 1: Describe behavior in plain text

```cucumber
Feature: Addition
  In order to avoid silly mistakes
  As a match idiot
  I want to be told the sum of two numbers

  Scenario: Add two numbers
    Given I have entered 50 into the calculator
    and I have entered 70 into the calculator
    When I press add
    Then the result should be 120 on the screen
```

#### 2: Run and get the template for a step definition file
peanut features/example.feature

```bash
Running features

...

Successful: 0
Failed: 0
Pending: 0
Skipped: 0
Unimplemented: 3

Given(/^I have entered (\d*\.)?(\d+) into the calculator$/, function(step, arg) {
  step.pending();
});

When(/^I press add$/, function(step) {
  step.pending();
});

Then(/^the result should be (\d*\.)?(\d+) on the screen$/, function(step, arg) {
  step.pending();
});
```

#### 3: Write a step definition in Javascript

```javascript
var assert = require('assert')
var calculator = require('../support/calculator')

Given(/^I have entered (\d*\.)?(\d+) into the calculator$/, function(step, arg) {
  calculator.push(parseInt(arg))
  step.done()
})

When(/^I press add $/, function(step) {
  step.pending()
})

Then(/^the result should be (\d*\.)?(\d+) on the screen$/, function(step, arg) {
  step.pending()
})
```

#### 4: Run and watch it fail
peanut features/example.feature

```bash
Running features

Error: Cannot find module '../support/calculator'
....
```

#### 5: Write code to make the test pass

```javascript
module.exports = (function() {
  var args = []

  return {
    push: function(arg) {
      args.push(arg)
    }
  }
})()
```

#### 6: Run again and see the step pass
peanut features/example.feature

```bash
Running features

....

Successful: 2
Failed: 0
Pending: 1
Skipped: 1
Unimplemented: 0
```

#### 7: Repeat 2 - 6 until green like a cuke
peanut features/example.feature

```bash
Running features

....

Successful: 4
Failed: 0
Pending: 0
Skipped: 0
Unimplemented: 0
```

#### 8: Repeat 1 - 7 until the money runs out

# run all tests

    peanut

# help

    peanut -h

## License

(The MIT License)

Copyright (c) 2011 Didit &lt;developers@didit.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
