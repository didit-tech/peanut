/* Jison generated parser */
var grammar = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"SourceElements":4,"Feature":5,"Token":6,"FEATURE":7,"TAGS":8,"Whitespace":9,"LINE":10,"Background":11,"Scenario":12,"Outline":13,"Pystring":14,"Line":15,"EOF":16,"BACKGROUND":17,"Steps":18,"SCENARIO":19,"OUTLINE":20,"GIVEN":21,"WHEN":22,"THEN":23,"AND":24,"BUT":25,"NEWLINE":26,"COMMENT":27,"$accept":0,"$end":1},
terminals_: {2:"error",7:"FEATURE",8:"TAGS",10:"LINE",14:"Pystring",16:"EOF",17:"BACKGROUND",19:"SCENARIO",20:"OUTLINE",21:"GIVEN",22:"WHEN",23:"THEN",24:"AND",25:"BUT",26:"NEWLINE",27:"COMMENT"},
productions_: [0,[3,1],[4,1],[4,2],[5,1],[5,3],[5,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[11,0],[11,1],[11,2],[11,2],[12,1],[12,3],[12,2],[12,2],[13,1],[13,3],[13,2],[13,2],[18,2],[18,2],[18,2],[18,2],[18,2],[9,1],[9,1],[15,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 4:
      new yy.Feature(yy.file, ['FEATURE', _$[$0].first_line, $$[$0]]);
    
break;
case 5:
      new yy.Tag(yy.file, ['FEATURE_TAG', _$[$0-2].first_line, $$[$0-2]]);
    
break;
case 6:
      new yy.Line(yy.file, ['FEATURE_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 13: return yy.EOF(yy.file); 
break;
case 15:
      new yy.Background(yy.file, ['BACKGROUND', _$[$0].first_line, $$[$0]]);
    
break;
case 16:
      if ($$[$0-1] !== undefined) {
        new yy.Line(yy.file, ['BACKGROUND_DESCRIPTION', _$[$0].first_line, $$[$0]]);
      }
    
break;
case 18:
      new yy.Scenario(yy.file, ['SCENARIO', _$[$0].first_line, $$[$0]]);
    
break;
case 19:
      new yy.Tag(yy.file, ['SCENARIO_TAG', _$[$0-2].first_line, $$[$0-2]]);
    
break;
case 20:
      new yy.Line(yy.file, ['SCENARIO_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 22:
      new yy.Outline(yy.file, ['OUTLINE', _$[$0].first_line, $$[$0]]);
    
break;
case 23:
      new yy.Tag(yy.file, ['OUTLINE_TAG', _$[$0-2].first_line, $$[$0-2]]);
    
break;
case 24:
      new yy.Line(yy.file, ['OUTLINE_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 26:
      new yy.Step(yy.file, ['GIVEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 27:
      new yy.Step(yy.file, ['WHEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 28:
      new yy.Step(yy.file, ['THEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 29:
      new yy.Step(yy.file, ['AND', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 30:
      new yy.Step(yy.file, ['BUT', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);
    
break;
case 31:
      new yy.Newline(yy.file, ['NEWLINE', yylineno, $$[$0]]);
    
break;
case 32:
      new yy.Comment(yy.file, ['COMMENT', yylineno, $$[$0]]);
    
break;
case 33:
      new yy.Line(yy.file, ['LINE', _$[$0].first_line, $$[$0]]);
    
break;
}
},
table: [{3:1,4:2,5:3,7:[1,4],8:[1,5]},{1:[3]},{1:[2,1],6:6,8:[1,16],9:10,10:[1,20],11:7,12:8,13:9,14:[1,11],15:12,16:[1,13],17:[1,14],19:[1,15],20:[1,17],21:[2,14],22:[2,14],23:[2,14],24:[2,14],25:[2,14],26:[1,18],27:[1,19]},{1:[2,2],8:[2,2],10:[1,21],14:[2,2],16:[2,2],17:[2,2],19:[2,2],20:[2,2],21:[2,2],22:[2,2],23:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2]},{1:[2,4],8:[2,4],10:[2,4],14:[2,4],16:[2,4],17:[2,4],19:[2,4],20:[2,4],21:[2,4],22:[2,4],23:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4]},{9:22,26:[1,18],27:[1,19]},{1:[2,3],8:[2,3],10:[2,3],14:[2,3],16:[2,3],17:[2,3],19:[2,3],20:[2,3],21:[2,3],22:[2,3],23:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3]},{1:[2,7],8:[2,7],10:[1,23],14:[2,7],16:[2,7],17:[2,7],18:24,19:[2,7],20:[2,7],21:[1,25],22:[1,26],23:[1,27],24:[1,28],25:[1,29],26:[2,7],27:[2,7]},{1:[2,8],8:[2,8],10:[1,30],14:[2,8],16:[2,8],17:[2,8],18:31,19:[2,8],20:[2,8],21:[1,25],22:[1,26],23:[1,27],24:[1,28],25:[1,29],26:[2,8],27:[2,8]},{1:[2,9],8:[2,9],10:[1,32],14:[2,9],16:[2,9],17:[2,9],18:33,19:[2,9],20:[2,9],21:[1,25],22:[1,26],23:[1,27],24:[1,28],25:[1,29],26:[2,9],27:[2,9]},{1:[2,10],8:[2,10],10:[2,10],14:[2,10],16:[2,10],17:[2,10],19:[2,10],20:[2,10],21:[2,10],22:[2,10],23:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10]},{1:[2,11],8:[2,11],10:[2,11],14:[2,11],16:[2,11],17:[2,11],19:[2,11],20:[2,11],21:[2,11],22:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11]},{1:[2,12],8:[2,12],10:[2,12],14:[2,12],16:[2,12],17:[2,12],19:[2,12],20:[2,12],21:[2,12],22:[2,12],23:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12]},{1:[2,13],8:[2,13],10:[2,13],14:[2,13],16:[2,13],17:[2,13],19:[2,13],20:[2,13],21:[2,13],22:[2,13],23:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13]},{1:[2,15],8:[2,15],10:[2,15],14:[2,15],16:[2,15],17:[2,15],19:[2,15],20:[2,15],21:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15]},{1:[2,18],8:[2,18],10:[2,18],14:[2,18],16:[2,18],17:[2,18],19:[2,18],20:[2,18],21:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18]},{9:34,26:[1,18],27:[1,19]},{1:[2,22],8:[2,22],10:[2,22],14:[2,22],16:[2,22],17:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22]},{1:[2,31],7:[2,31],8:[2,31],10:[2,31],14:[2,31],16:[2,31],17:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31]},{1:[2,32],7:[2,32],8:[2,32],10:[2,32],14:[2,32],16:[2,32],17:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32]},{1:[2,33],8:[2,33],10:[2,33],14:[2,33],16:[2,33],17:[2,33],19:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33]},{1:[2,6],8:[2,6],10:[2,6],14:[2,6],16:[2,6],17:[2,6],19:[2,6],20:[2,6],21:[2,6],22:[2,6],23:[2,6],24:[2,6],25:[2,6],26:[2,6],27:[2,6]},{5:35,7:[1,4],8:[1,5]},{1:[2,16],8:[2,16],10:[2,16],14:[2,16],16:[2,16],17:[2,16],19:[2,16],20:[2,16],21:[2,16],22:[2,16],23:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16]},{1:[2,17],8:[2,17],10:[2,17],14:[2,17],16:[2,17],17:[2,17],19:[2,17],20:[2,17],21:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17]},{10:[1,36]},{10:[1,37]},{10:[1,38]},{10:[1,39]},{10:[1,40]},{1:[2,20],8:[2,20],10:[2,20],14:[2,20],16:[2,20],17:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20]},{1:[2,21],8:[2,21],10:[2,21],14:[2,21],16:[2,21],17:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21]},{1:[2,24],8:[2,24],10:[2,24],14:[2,24],16:[2,24],17:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24]},{1:[2,25],8:[2,25],10:[2,25],14:[2,25],16:[2,25],17:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25]},{8:[1,16],12:41,13:42,19:[1,15],20:[1,17]},{1:[2,5],8:[2,5],10:[1,21],14:[2,5],16:[2,5],17:[2,5],19:[2,5],20:[2,5],21:[2,5],22:[2,5],23:[2,5],24:[2,5],25:[2,5],26:[2,5],27:[2,5]},{1:[2,26],8:[2,26],10:[2,26],14:[2,26],16:[2,26],17:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26]},{1:[2,27],8:[2,27],10:[2,27],14:[2,27],16:[2,27],17:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27]},{1:[2,28],8:[2,28],10:[2,28],14:[2,28],16:[2,28],17:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28]},{1:[2,29],8:[2,29],10:[2,29],14:[2,29],16:[2,29],17:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29]},{1:[2,30],8:[2,30],10:[2,30],14:[2,30],16:[2,30],17:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30]},{1:[2,19],8:[2,19],10:[1,30],14:[2,19],16:[2,19],17:[2,19],18:31,19:[2,19],20:[2,19],21:[1,25],22:[1,26],23:[1,27],24:[1,28],25:[1,29],26:[2,19],27:[2,19]},{1:[2,23],8:[2,23],10:[1,32],14:[2,23],16:[2,23],17:[2,23],18:33,19:[2,23],20:[2,23],21:[1,25],22:[1,26],23:[1,27],24:[1,28],25:[1,29],26:[2,23],27:[2,23]}],
defaultActions: {},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }
            
            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column,
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match.length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 26
break;
case 1:/* skip whitespace */
break;
case 2:return 8
break;
case 3:return 27
break;
case 4:return 7
break;
case 5:return 17
break;
case 6:return 19
break;
case 7:return 20
break;
case 8:return 21
break;
case 9:return 22
break;
case 10:return 23
break;
case 11:return 24
break;
case 12:return 25
break;
case 13:return 10
break;
case 14:return 16
break;
}
};
lexer.rules = [/^\n+/,/^\s+/,/^^@(\w+)/,/^^#.+/,/^^Feature:/,/^^Background:/,/^^Scenario:/,/^^Scenario Outline:/,/^^Given\b/,/^^When\b/,/^^Then\b/,/^^And\b/,/^^But\b/,/^(.+)/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}