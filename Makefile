##
# default task: when you just run `make`
##

default: all

all: unit peanut

unit:
	@NODE_PATH=test:lib expresso -t 250 -I test -I lib -s test/unit/*.test.js

peanut:
	bin/peanut -s

.PHONY: unit peanut all
