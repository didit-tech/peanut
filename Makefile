##
# default task: when you just run `make`
##

default: unit

unit:
	@NODE_PATH=test:lib expresso -t 250 -I test -I lib -s test/unit/*.test.js

.PHONY: unit
