/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"SourceElements":4,"Feature":5,"Token":6,"FEATURE":7,"SERIAL":8,"Whitespace":9,"TIMEOUT":10,"TAGS":11,"LINE":12,"Background":13,"Scenario":14,"Outline":15,"Pystring":16,"Table":17,"Examples":18,"Line":19,"Teardown":20,"EOF":21,"TEARDOWN":22,"Steps":23,"BACKGROUND":24,"SCENARIO":25,"OUTLINE":26,"EXAMPLE":27,"TABLE":28,"GIVEN":29,"WHEN":30,"THEN":31,"AND":32,"BUT":33,"NEWLINE":34,"COMMENT":35,"PYSTRING":36,"$accept":0,"$end":1},
terminals_: {2:"error",7:"FEATURE",8:"SERIAL",10:"TIMEOUT",11:"TAGS",12:"LINE",21:"EOF",22:"TEARDOWN",24:"BACKGROUND",25:"SCENARIO",26:"OUTLINE",27:"EXAMPLE",28:"TABLE",29:"GIVEN",30:"WHEN",31:"THEN",32:"AND",33:"BUT",34:"NEWLINE",35:"COMMENT",36:"PYSTRING"},
productions_: [0,[3,1],[4,1],[4,2],[5,1],[5,3],[5,3],[5,3],[5,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[20,0],[20,1],[20,2],[20,2],[13,0],[13,1],[13,2],[13,2],[14,1],[14,3],[14,2],[14,2],[15,1],[15,3],[15,2],[18,3],[23,2],[23,2],[23,2],[23,2],[23,2],[9,1],[9,1],[16,0],[16,1],[17,0],[17,1],[19,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 4:
      new yy.Feature(yy.file, ['FEATURE', _$[$0].first_line, $$[$0]]);

break;
case 5:
      new yy.Serial(yy.file, ['SERIAL_FEATURE', _$[$0-2].first_line, $$[$0-2]]);

break;
case 6:
      new yy.Timeout(yy.file, ['FEATURE_TIMEOUT', _$[$0-2].first_line, $$[$0-2]]);

break;
case 7:
      new yy.Tag(yy.file, ['FEATURE_TAG', _$[$0-2].first_line, $$[$0-2]]);

break;
case 8:
      new yy.Line(yy.file, ['FEATURE_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 18: return yy.EOF(yy.file);
break;
case 20:
      new yy.Teardown(yy.file, ['TEARDOWN', _$[$0].first_line, $$[$0]]);

break;
case 21:
      if ($$[$0-1] !== undefined) {
        new yy.Line(yy.file, ['TEARDOWN_DESCRIPTION', _$[$0].first_line, $$[$0]]);
      }

break;
case 24:
      new yy.Background(yy.file, ['BACKGROUND', _$[$0].first_line, $$[$0]]);

break;
case 25:
      if ($$[$0-1] !== undefined) {
        new yy.Line(yy.file, ['BACKGROUND_DESCRIPTION', _$[$0].first_line, $$[$0]]);
      }

break;
case 27:
      new yy.Scenario(yy.file, ['SCENARIO', _$[$0].first_line, $$[$0]]);

break;
case 28:
      new yy.Tag(yy.file, ['SCENARIO_TAG', _$[$0-2].first_line, $$[$0-2]]);

break;
case 29:
      new yy.Line(yy.file, ['SCENARIO_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 31:
      new yy.Outline(yy.file, ['OUTLINE', _$[$0].first_line, $$[$0]]);

break;
case 32:
      new yy.Tag(yy.file, ['OUTLINE_TAG', _$[$0-2].first_line, $$[$0-2]]);

break;
case 33:
      new yy.Line(yy.file, ['OUTLINE_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 34:
      new yy.Examples(yy.file, ['EXAMPLES', _$[$0-2].first_line, $$[$0]]);

break;
case 35:
      new yy.Step(yy.file, ['GIVEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 36:
      new yy.Step(yy.file, ['WHEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 37:
      new yy.Step(yy.file, ['THEN', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 38:
      new yy.Step(yy.file, ['AND', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 39:
      new yy.Step(yy.file, ['BUT', _$[$0-1].first_line, $$[$0-1]]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', _$[$0].first_line, $$[$0]]);

break;
case 40:
      new yy.Newline(yy.file, ['NEWLINE', yylineno, $$[$0]]);

break;
case 41:
      new yy.Comment(yy.file, ['COMMENT', yylineno, $$[$0]]);

break;
case 43:
      new yy.Pystring(yy.file, ['PYSTRING', _$[$0].first_line, $$[$0]]);

break;
case 45:
      new yy.Table(yy.file, ['TABLE', _$[$0].first_line, $$[$0]]);

break;
case 46:
      new yy.Line(yy.file, ['LINE', _$[$0].first_line, $$[$0]]);

break;
}
},
table: [{3:1,4:2,5:3,7:[1,4],8:[1,5],10:[1,6],11:[1,7]},{1:[3]},{1:[2,1],6:8,9:16,11:[1,21],12:[1,26],13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:17,21:[1,18],22:[1,29],24:[1,19],25:[1,20],26:[1,22],27:[1,25],28:[1,24],29:[2,23],30:[2,23],31:[2,23],32:[2,23],33:[2,23],34:[1,27],35:[1,28],36:[1,23]},{1:[2,2],11:[2,2],12:[1,30],21:[2,2],22:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],30:[2,2],31:[2,2],32:[2,2],33:[2,2],34:[2,2],35:[2,2],36:[2,2]},{1:[2,4],11:[2,4],12:[2,4],21:[2,4],22:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],30:[2,4],31:[2,4],32:[2,4],33:[2,4],34:[2,4],35:[2,4],36:[2,4]},{9:31,34:[1,27],35:[1,28]},{9:32,34:[1,27],35:[1,28]},{9:33,34:[1,27],35:[1,28]},{1:[2,3],11:[2,3],12:[2,3],21:[2,3],22:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],30:[2,3],31:[2,3],32:[2,3],33:[2,3],34:[2,3],35:[2,3],36:[2,3]},{1:[2,9],11:[2,9],12:[1,34],21:[2,9],22:[2,9],23:35,24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],29:[1,36],30:[1,37],31:[1,38],32:[1,39],33:[1,40],34:[2,9],35:[2,9],36:[2,9]},{1:[2,10],11:[2,10],12:[1,41],21:[2,10],22:[2,10],23:42,24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],29:[1,36],30:[1,37],31:[1,38],32:[1,39],33:[1,40],34:[2,10],35:[2,10],36:[2,10]},{1:[2,11],11:[2,11],12:[1,43],21:[2,11],22:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],29:[2,11],30:[2,11],31:[2,11],32:[2,11],33:[2,11],34:[2,11],35:[2,11],36:[2,11]},{1:[2,12],11:[2,12],12:[2,12],21:[2,12],22:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],31:[2,12],32:[2,12],33:[2,12],34:[2,12],35:[2,12],36:[2,12]},{1:[2,13],11:[2,13],12:[2,13],21:[2,13],22:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],30:[2,13],31:[2,13],32:[2,13],33:[2,13],34:[2,13],35:[2,13],36:[2,13]},{1:[2,14],11:[2,14],12:[2,14],21:[2,14],22:[2,14],24:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],29:[2,14],30:[2,14],31:[2,14],32:[2,14],33:[2,14],34:[2,14],35:[2,14],36:[2,14]},{1:[2,15],11:[2,15],12:[2,15],21:[2,15],22:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],30:[2,15],31:[2,15],32:[2,15],33:[2,15],34:[2,15],35:[2,15],36:[2,15]},{1:[2,16],11:[2,16],12:[2,16],21:[2,16],22:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],30:[2,16],31:[2,16],32:[2,16],33:[2,16],34:[2,16],35:[2,16],36:[2,16]},{1:[2,17],11:[2,17],12:[1,44],21:[2,17],22:[2,17],23:45,24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[1,36],30:[1,37],31:[1,38],32:[1,39],33:[1,40],34:[2,17],35:[2,17],36:[2,17]},{1:[2,18],11:[2,18],12:[2,18],21:[2,18],22:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],30:[2,18],31:[2,18],32:[2,18],33:[2,18],34:[2,18],35:[2,18],36:[2,18]},{1:[2,24],11:[2,24],12:[2,24],21:[2,24],22:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],30:[2,24],31:[2,24],32:[2,24],33:[2,24],34:[2,24],35:[2,24],36:[2,24]},{1:[2,27],11:[2,27],12:[2,27],21:[2,27],22:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],29:[2,27],30:[2,27],31:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27]},{9:46,34:[1,27],35:[1,28]},{1:[2,31],11:[2,31],12:[2,31],21:[2,31],22:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],30:[2,31],31:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31]},{1:[2,43],11:[2,43],12:[2,43],21:[2,43],22:[2,43],24:[2,43],25:[2,43],26:[2,43],27:[2,43],28:[2,43],29:[2,43],30:[2,43],31:[2,43],32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43]},{1:[2,45],11:[2,45],12:[2,45],21:[2,45],22:[2,45],24:[2,45],25:[2,45],26:[2,45],27:[2,45],28:[2,45],29:[2,45],30:[2,45],31:[2,45],32:[2,45],33:[2,45],34:[2,45],35:[2,45],36:[2,45]},{9:47,34:[1,27],35:[1,28]},{1:[2,46],11:[2,46],12:[2,46],21:[2,46],22:[2,46],24:[2,46],25:[2,46],26:[2,46],27:[2,46],28:[2,46],29:[2,46],30:[2,46],31:[2,46],32:[2,46],33:[2,46],34:[2,46],35:[2,46],36:[2,46]},{1:[2,40],7:[2,40],8:[2,40],10:[2,40],11:[2,40],12:[2,40],21:[2,40],22:[2,40],24:[2,40],25:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],30:[2,40],31:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40]},{1:[2,41],7:[2,41],8:[2,41],10:[2,41],11:[2,41],12:[2,41],21:[2,41],22:[2,41],24:[2,41],25:[2,41],26:[2,41],27:[2,41],28:[2,41],29:[2,41],30:[2,41],31:[2,41],32:[2,41],33:[2,41],34:[2,41],35:[2,41],36:[2,41]},{1:[2,20],11:[2,20],12:[2,20],21:[2,20],22:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],30:[2,20],31:[2,20],32:[2,20],33:[2,20],34:[2,20],35:[2,20],36:[2,20]},{1:[2,8],11:[2,8],12:[2,8],21:[2,8],22:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],29:[2,8],30:[2,8],31:[2,8],32:[2,8],33:[2,8],34:[2,8],35:[2,8],36:[2,8]},{5:48,7:[1,4],8:[1,5],10:[1,6],11:[1,7]},{5:49,7:[1,4],8:[1,5],10:[1,6],11:[1,7]},{5:50,7:[1,4],8:[1,5],10:[1,6],11:[1,7]},{1:[2,25],11:[2,25],12:[2,25],21:[2,25],22:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],30:[2,25],31:[2,25],32:[2,25],33:[2,25],34:[2,25],35:[2,25],36:[2,25]},{1:[2,26],11:[2,26],12:[2,26],21:[2,26],22:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],29:[2,26],30:[2,26],31:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26]},{12:[1,51]},{12:[1,52]},{12:[1,53]},{12:[1,54]},{12:[1,55]},{1:[2,29],11:[2,29],12:[2,29],21:[2,29],22:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],30:[2,29],31:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29]},{1:[2,30],11:[2,30],12:[2,30],21:[2,30],22:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],30:[2,30],31:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30]},{1:[2,33],11:[2,33],12:[2,33],21:[2,33],22:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],30:[2,33],31:[2,33],32:[2,33],33:[2,33],34:[2,33],35:[2,33],36:[2,33]},{1:[2,21],11:[2,21],12:[2,21],21:[2,21],22:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],30:[2,21],31:[2,21],32:[2,21],33:[2,21],34:[2,21],35:[2,21],36:[2,21]},{1:[2,22],11:[2,22],12:[2,22],21:[2,22],22:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],30:[2,22],31:[2,22],32:[2,22],33:[2,22],34:[2,22],35:[2,22],36:[2,22]},{11:[1,21],14:56,15:57,25:[1,20],26:[1,22]},{28:[1,58]},{1:[2,5],11:[2,5],12:[1,30],21:[2,5],22:[2,5],24:[2,5],25:[2,5],26:[2,5],27:[2,5],28:[2,5],29:[2,5],30:[2,5],31:[2,5],32:[2,5],33:[2,5],34:[2,5],35:[2,5],36:[2,5]},{1:[2,6],11:[2,6],12:[1,30],21:[2,6],22:[2,6],24:[2,6],25:[2,6],26:[2,6],27:[2,6],28:[2,6],29:[2,6],30:[2,6],31:[2,6],32:[2,6],33:[2,6],34:[2,6],35:[2,6],36:[2,6]},{1:[2,7],11:[2,7],12:[1,30],21:[2,7],22:[2,7],24:[2,7],25:[2,7],26:[2,7],27:[2,7],28:[2,7],29:[2,7],30:[2,7],31:[2,7],32:[2,7],33:[2,7],34:[2,7],35:[2,7],36:[2,7]},{1:[2,35],11:[2,35],12:[2,35],21:[2,35],22:[2,35],24:[2,35],25:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],31:[2,35],32:[2,35],33:[2,35],34:[2,35],35:[2,35],36:[2,35]},{1:[2,36],11:[2,36],12:[2,36],21:[2,36],22:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],30:[2,36],31:[2,36],32:[2,36],33:[2,36],34:[2,36],35:[2,36],36:[2,36]},{1:[2,37],11:[2,37],12:[2,37],21:[2,37],22:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],31:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37]},{1:[2,38],11:[2,38],12:[2,38],21:[2,38],22:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],30:[2,38],31:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38]},{1:[2,39],11:[2,39],12:[2,39],21:[2,39],22:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],29:[2,39],30:[2,39],31:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39]},{1:[2,28],11:[2,28],12:[1,41],21:[2,28],22:[2,28],23:42,24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[1,36],30:[1,37],31:[1,38],32:[1,39],33:[1,40],34:[2,28],35:[2,28],36:[2,28]},{1:[2,32],11:[2,32],12:[1,43],21:[2,32],22:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],30:[2,32],31:[2,32],32:[2,32],33:[2,32],34:[2,32],35:[2,32],36:[2,32]},{1:[2,34],11:[2,34],12:[2,34],21:[2,34],22:[2,34],24:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],30:[2,34],31:[2,34],32:[2,34],33:[2,34],34:[2,34],35:[2,34],36:[2,34]}],
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
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
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
                    last_column: lstack[lstack.length-1].last_column
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
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
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
case 0:return 34
break;
case 1:/* skip whitespace */
break;
case 2:return 36
break;
case 3:return 28
break;
case 4:return 8
break;
case 5:return 10
break;
case 6:return 11
break;
case 7:return 35
break;
case 8:return 7
break;
case 9:return 24
break;
case 10:return 22
break;
case 11:return 25
break;
case 12:return 26
break;
case 13:return 27
break;
case 14:return 27
break;
case 15:return 29
break;
case 16:return 30
break;
case 17:return 31
break;
case 18:return 32
break;
case 19:return 33
break;
case 20:return 12
break;
case 21:return 21
break;
}
};
lexer.rules = [/^\n+/,/^\s+/,/^"""(.|\n(?!\s*"""))+\n\s*"""/,/^\|(.|\n(?=\s*\|))+\|/,/^^\$serial\b/,/^^\$timeout (\d+)/,/^^@(\w+)/,/^^#.+/,/^^Feature:/,/^^Background:/,/^^Teardown:/,/^^Scenario:/,/^^Scenario Outline:/,/^^Examples:/,/^^Scenarios:/,/^^Given\b/,/^^When\b/,/^^Then\b/,/^^And\b/,/^^But\b/,/^(.+)/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
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