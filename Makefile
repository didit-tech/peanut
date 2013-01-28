##
# default task: when you just run `make`
##

default: all

all: unit peanut

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		test/unit

peanut:
	bin/peanut -s

.PHONY: unit peanut all
